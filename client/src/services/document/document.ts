import type { TDocument } from '@/components/documents/types';
import { apiClient } from '../api/api-client';

const mockDoumentsPath = '/mock-documents/document.json'; // temporary

export const getDocuments = async () => {
  const res = await fetch(mockDoumentsPath);
  const data = await res.json();
  return data as Array<TDocument>;
};

export const uploadDocument = async (formData: FormData) => {
  const data = await apiClient.postFile('/api/document/upload', formData);
  return data;
};
