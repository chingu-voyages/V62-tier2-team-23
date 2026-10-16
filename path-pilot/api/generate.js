import { GoogleGenAI } from "@google/genai";

// Fastest first. If one is slow or fails, the next one is tried.
const MODELS = ["gemini-3.6-flash", "gemini-3.5-flash-lite", "gemini-3.8-flash"];
const TIMEOUT_MS = 20000;

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
        try {
            const started = Date.now();

            const response = await ai.models.generateContent({
                model,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    thinkingConfig: { thinkingLevel: "low" },
                    httpOptions: { timeout: TIMEOUT_MS },
                },
            });

            console.log(`${model} answered in ${Date.now() - started}ms`);

            const parsed = JSON.parse(response.text);

            const steps = parsed.steps.map((step, index) => ({
                id: index + 1,
                title: step.title,
                status: index === 0 ? "in-progress" : "not-started",
            }));

            return res.status(200).json({ steps });
        } catch (error) {
            lastError = error;
            console.warn(`${model} failed:`, error?.status || error?.message);
            // Any failure (timeout, busy, bad JSON) moves on to the next model
        }
    }

    console.error("Gemini failed:", lastError);
    return res.status(502).json({ error: "Could not generate learning path" });
}