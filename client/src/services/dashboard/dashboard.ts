import { apiClient } from '../api/api-client';

export const getDashboradData = async () => {
  return await apiClient.get('/api/dashboard');
};
