import { apiClient } from '../api/api-client';

export const getDocuments = async () => {
  return await apiClient.get('/api/document');
};

export const uploadDocument = async (formData: FormData) => {
  return await apiClient.postFile('/api/document/upload', formData);
};

export const deleteDocument = async (name: string) => {
  return await apiClient.delete('/api/document/delete', { name });
};
