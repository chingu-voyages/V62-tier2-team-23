import { GoogleGenAI } from "@google/genai";

const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash"];
const RETRIES_PER_MODEL = 3;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isBusyError(error) {
    return error?.status === 503 || error?.status === 429 || /503|UNAVAILABLE|429/.test(error?.message ?? "");
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const userData = req.body;

    if (!userData || typeof userData.careerGoal !== "string" || userData.careerGoal.length > 50) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

                const steps = parsed.steps.map((step, index) => ({
                    id: index + 1,
                    title: step.title,
                    status: index === 0 ? "in-progress" : "not-started",
                }));

                return res.status(200).json({ steps });
            } catch (error) {
                lastError = error;

                if (!isBusyError(error)) {
                    break;
                }

                if (attempt < RETRIES_PER_MODEL) {
                    await wait(1000 * 2 ** (attempt - 1));
                }
            }
        }
    }

    console.error("Gemini failed:", lastError);
    return res.status(502).json({ error: "Could not generate learning path" });
}