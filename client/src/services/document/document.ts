import type { TDocument } from '@/components/documents/types';
import { apiClient } from '../api/api-client';

export const getDocuments = async () => {
  const data = await apiClient.get('/api/document/');
  return data as Array<TDocument>;
};

export const uploadDocument = async (formData: FormData) => {
  const data = await apiClient.postFile('/api/document/upload', formData);
  return data;
};

export const deleteDocument = async (name: string) => {
  return await apiClient.delete('/api/document/delete', { name });
};
