import { apiClient } from '../api/api-client';

export const startChat = async ({
  pdfUrl,
  name,
}: {
  pdfUrl: string;
  name: string;
}) => {
  return await apiClient.post('/api/ai/start-chat', { pdfUrl, name });
};

export const chat = async ({
  prompt,
  name,
}: {
  prompt: string;
  name: string;
}) => {
  const data = await apiClient.post('/api/ai/chat', { prompt, name });
  if ('text' in data) return data.text as string;
  return null;
};
