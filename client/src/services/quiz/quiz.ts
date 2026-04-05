import { apiClient } from '../api/api-client';

export const generateQuiz = async (name: string, total: number) => {
  return await apiClient.post('/api/quiz/generate', { name, total });
};
