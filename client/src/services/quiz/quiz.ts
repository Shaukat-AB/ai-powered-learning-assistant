import type { TQuizzes } from '@/components/documents/types';

import { apiClient } from '../api/api-client';

export const generateQuiz = async (name: string, total: number) => {
  return await apiClient.post('/api/quiz/generate', { name, total });
};

export const getQuizzes = async (name: string) => {
  const data = await apiClient.get('/api/quiz/get', name);
  return data as TQuizzes;
};

export const deleteQuiz = async (id: string) => {
  return await apiClient.delete('/api/quiz/delete', { id });
};
