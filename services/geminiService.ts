
import { GoogleGenAI, Type } from "@google/genai";
import { MindsetResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMindsetAnalysis = async (scenario: string): Promise<MindsetResponse> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following scenario from two psychological perspectives: "Survival Mode" (Fear, Scarcity, Immediate Reaction) and "Creative Mode" (Vision, Abundance, Conscious Creation). 
    Scenario: "${scenario}"
    
    Return a detailed path of 4 action steps for each mode.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          survivalPath: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                icon: { type: Type.STRING, description: "A simple emoji representing the step" }
              },
              required: ["title", "description", "icon"]
            }
          },
          creativePath: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                icon: { type: Type.STRING, description: "A simple emoji representing the step" }
              },
              required: ["title", "description", "icon"]
            }
          },
          survivalMotto: { type: Type.STRING, description: "A 1-sentence catchy motto for survival mode" },
          creativeMotto: { type: Type.STRING, description: "A 1-sentence catchy motto for creative mode" },
          survivalFear: { type: Type.STRING, description: "The core fear driving the survival mode" },
          creativeVision: { type: Type.STRING, description: "The core vision driving the creative mode" }
        },
        required: ["survivalPath", "creativePath", "survivalMotto", "creativeMotto", "survivalFear", "creativeVision"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
