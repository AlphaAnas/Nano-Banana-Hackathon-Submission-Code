
import { GoogleGenAI, Modality, Part } from "@google/genai";
import { ImageFile } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (file: ImageFile): Part => {
    return {
        inlineData: {
            data: file.base64,
            mimeType: file.mimeType,
        },
    };
};

export const generateImageWithGemini = async (prompt: string, images: ImageFile[]): Promise<string> => {
    try {
        const imageParts: Part[] = images.map(fileToGenerativePart);
        const textPart: Part = { text: prompt };

        const allParts: Part[] = [...imageParts, textPart];
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: allParts,
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                return `data:${mimeType};base64,${base64ImageBytes}`;
            }
        }
        
        // Fallback or error if no image is returned
        const textResponse = response.text;
        throw new Error(`API did not return an image. Response: ${textResponse}`);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the image.");
    }
};
