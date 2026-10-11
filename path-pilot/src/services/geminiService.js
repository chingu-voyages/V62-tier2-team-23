import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

// Tries in order. Used more than once in case the first one is failing.
const MODELS = ["gemini-3.8-flash", "gemini-2.5-flash"];
const RETRIES_PER_MODEL = 3;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isBusyError(error) {
    // 503 = overloaded, 429 = rate limited.
    return error?.status === 503 || error?.status === 429 || /503|UNAVAILABLE|429/.test(error?.message ?? "");
}

export async function generateLearningPath(userData) {
    const prompt = `You are a helpful assistant. Please create a learning path based on the following user data: ${JSON.stringify(userData)}
        Return ONLY valid JSON in exactly this shape, with 5 to 8 steps ordered from first to last:
        { "steps": [ { "title": "Short step title" } ] }`;

    let lastError;

    for (const model of MODELS) {
        for (let attempt = 1; attempt <= RETRIES_PER_MODEL; attempt++) {
            try {
                const response = await ai.models.generateContent({
                    model,
                    contents: prompt,
                    config: { responseMimeType: "application/json" },
                });

                const parsed = JSON.parse(response.text);

                return parsed.steps.map((step, index) => ({
                    id: index + 1,
                    title: step.title,
                    status: index === 0 ? "in-progress" : "not-started",
                }));
            } catch (error) {
                lastError = error;

                // Only retries when the service is busy
                if (!isBusyError(error)) {
                    throw error;
                }

                console.warn(`${model} busy (attempt ${attempt}/${RETRIES_PER_MODEL})`);

                // We wait depending on the amount of tries. 1s, 2s, then it moves onto a new model.
                if (attempt < RETRIES_PER_MODEL) {
                    await wait(1000 * 2 ** (attempt - 1));
                }
            }
        }
    }

    throw lastError;
}