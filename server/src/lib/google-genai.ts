import { config } from 'dotenv';

import {
  Chat,
  createPartFromUri,
  GoogleGenAI,
  ThinkingLevel,
  File as TFile,
} from '@google/genai';

config();

const systemInstruction = process.env.VITE_AI_INSTRUCTION;
const model = 'gemini-3-flash-preview';

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });
const thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };

const createChat = () => {
  return ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemInstruction,
      thinkingConfig: thinkingConfig,
    },
  });
};

const aiGetFile = async (name: string) => {
  try {
    return await ai.files.get({ name: name });
  } catch (error) {
    return error instanceof Error ? error : new Error('File not found');
  }
};

const createFileContent = (file: TFile) => {
  return createPartFromUri(file?.uri ?? '', file?.mimeType ?? '');
};

export {
  ai,
  model,
  createChat,
  aiGetFile,
  createFileContent,
  thinkingConfig,
  type Chat,
  type TFile,
};
