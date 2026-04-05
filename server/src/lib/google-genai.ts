import { config } from 'dotenv';

import {
  Chat,
  createPartFromUri,
  GoogleGenAI,
  ThinkingLevel,
  File as TFile,
  ContentListUnion,
  GenerateContentConfig,
} from '@google/genai';

config();

const aiChatInstruction = process.env.AI_CHAT_INSTRUCTION;
const aiQuizzInstruction = process.env.AI_QUIZZ_INSTRUCTION;

const model = 'gemini-3-flash-preview';

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });
const thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };

const createChat = () => {
  return ai.chats.create({
    model: model,
    config: {
      systemInstruction: aiChatInstruction,
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

const aiGenerateContent = (
  contents: ContentListUnion,
  config?: Omit<GenerateContentConfig, 'thinkingConfig'> | undefined
) => {
  return ai.models.generateContent({
    model: model,
    contents: contents,
    config: {
      thinkingConfig: thinkingConfig,
      ...config,
    },
  });
};

export {
  ai,
  model,
  aiQuizzInstruction,
  createChat,
  aiGenerateContent,
  aiGetFile,
  createFileContent,
  thinkingConfig,
  type Chat,
  type TFile,
};
