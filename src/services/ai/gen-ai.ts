import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_AI_API_KEY });
const model = 'gemini-3-flash-preview';

export const getResponse = async (
  promt: string,
  instruction: string | undefined = undefined
) => {
  const res = await ai.models.generateContent({
    model: model,
    contents: promt,
    config: {
      systemInstruction: instruction,
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.LOW,
      },
    },
  });

  return res.text;
};
