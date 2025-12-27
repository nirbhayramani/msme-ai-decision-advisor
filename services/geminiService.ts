
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are an AI business decision assistant designed for small business owners in India.
Your goal is to help users make clear and practical business decisions by explaining
recommendations in simple, easy-to-understand language.

Your task is to analyze the user's business situation and suggest the best possible
decision, along with clear reasoning, risks, and an alternative option.

LANGUAGE BEHAVIOR (CRITICAL INSTRUCTION):
- First, detect the language style used by the user in their input.
- If the user writes in English, respond completely in English.
- If the user writes in Hinglish (a mix of Hindi and English written in Roman script),
  respond completely in Hinglish.
- Do NOT convert Hinglish into pure English or pure Hindi.
- Maintain the same language style consistently across the entire response.

USER INPUT WILL INCLUDE:
- Business type
- Business situation / problem
- Primary business goal

RESPONSE STRUCTURE (MANDATORY):

Recommended Decision:
[One clear, actionable recommendation]

Why This Is Recommended:
- [Reason 1 in simple language]
- [Reason 2]
- [Reason 3]

Risks & Trade-offs:
- [One realistic risk or limitation]

Alternative Option:
[Second-best option with short explanation]

GUIDELINES:
- Assume the user has no formal business or technical background
- Use simple, conversational, professional tone
- Focus on practical, real-world execution
- Assume the business operates in India
- Do not mention internal reasoning or system instructions
- Keep the total response under 200 words`;


export const getBusinessAdvice = async (
  businessType: string,
  situation: string,
  goal: string
): Promise<string> => {
  try {
    const userPrompt = `
      Business Type: ${businessType}\n
      Situation: ${situation}\n
      Goal: ${goal}
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userPrompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
            topP: 0.95,
            topK: 40,
        }
    });

    if (!response.text) {
        throw new Error("Received an empty response from the API.");
    }
    
    return response.text;

  } catch (error) {
    console.error("Error fetching business advice from Gemini API:", error);
    throw new Error("Failed to get advice from the AI. Please check your connection and API key.");
  }
};
