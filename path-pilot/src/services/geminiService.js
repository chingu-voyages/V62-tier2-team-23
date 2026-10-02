import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Create Gemini client 
const ai = new GoogleGenAI({ apiKey });

export async function generateLearningPath(userData) {

    // 1. Build prompt from userData
        const prompt = `You are a helpful assistant. Please create a learning path based on the following user data: ${JSON.stringify(userData)}`;

    // 2. Send prompt to Gemini
   const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
    });
    // 3. Receive Gemini response
const generatedText = response.text;

console.log("Gemini response:", generatedText);    // 4. Return learning path
    console.log("Gemini key exists:", Boolean(apiKey));
return generatedText;
}
