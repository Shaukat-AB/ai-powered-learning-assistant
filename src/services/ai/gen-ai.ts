import {
  Chat,
  createPartFromUri,
  GoogleGenAI,
  ThinkingLevel,
} from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_AI_API_KEY });
const systemInstruction = import.meta.env.VITE_AI_INSTRUCTION;
const model = 'gemini-3-flash-preview';

const chatMap = new Map<string, Chat>(); // keep short-term history;

export const startChat = async ({
  pdfUrl,
  name,
}: {
  pdfUrl: string;
  name: string;
}) => {
  if (!pdfUrl) return false;

  const fileList = await ai.files.list();
  if (fileList.page.some((f) => f.name?.endsWith(name))) return false;

  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemInstruction,
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.LOW,
      },
    },
  });

  chatMap.set(name, chat);

  const pdfBuffer = await fetch(pdfUrl).then((response) =>
    response.arrayBuffer()
  );

  const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

  const file = await ai.files.upload({
    file: fileBlob,
    config: {
      name: name,
    },
  });

  // Wait for the file to be processed.
  if (file.name) {
    let getFile = await ai.files.get({ name: file.name });

    while (getFile.state === 'PROCESSING') {
      getFile = await ai.files.get({ name: file.name });
      // console.log(`current file status: ${getFile.state}`);
      // console.log('File is still processing, retrying in 5 seconds');
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
    }
  }
  return file.uri && file.mimeType;
};

export const resumeChat = async ({
  prompt = 'Summarize this document',
  name,
}: {
  prompt: string;
  name: string;
}) => {
  const file = await ai.files.get({ name: name });
  if (!file) return;

  let chat = chatMap.get(name);
  if (!chat) {
    chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
    });
    chatMap.set(name, chat);
  }

  const fileContent = createPartFromUri(file?.uri ?? '', file?.mimeType ?? '');
  const response = await chat.sendMessage({
    message: [prompt, fileContent],
  });

  // console.log('contents:', [prompt, fileContent]);
  return response.text;
};
