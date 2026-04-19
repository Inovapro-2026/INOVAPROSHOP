import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// The GEMINI_API_KEY is handled by the platform and available in process.env
export const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || '' 
});

/**
 * Generates an image using the Gemini 2.5 Flash Image model (Nano Banana).
 * @param prompt The descriptive prompt for the image.
 * @param aspectRatio The desired aspect ratio ("1:1", "16:9", etc.).
 * @returns A base64 image URL or null if failed.
 */
export async function generateNanoImage(prompt: string, aspectRatio: "1:1" | "16:9" | "4:3" | "3:4" | "9:16" = "1:1") {
    console.log("AI Image Generation disabled by platform rules.");
    return null;
}
