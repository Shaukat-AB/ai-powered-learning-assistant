import { apiClient } from '../api/api-client';

export const chat = async ({
  prompt,
  name,
}: {
  prompt: string;
  name: string;
}) => {
  const data = await apiClient.post('/api/ai/chat', { prompt, name });

  if ('text' in data) return data.text as string;

  // Check if its error
  if ('message' in data && 'success' in data) {
    return data as { message?: string; success?: boolean };
  }

  return null;
};
