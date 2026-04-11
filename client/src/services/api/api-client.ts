import { currentUser } from '@/lib/firebase';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type TEndpoint =
  | '/api/ai/chat'
  | '/api/document'
  | '/api/document/delete'
  | '/api/document/upload'
  | '/api/quiz/generate'
  | '/api/quiz/get'
  | '/api/quiz/update'
  | '/api/quiz/delete'
  | '/api/dashboard';

export const apiClient = {
  get: async (endpoint: TEndpoint, param = '') => {
    const token = await currentUser?.getIdToken();

    const endpointWithParam = param ? `${endpoint}/${param}` : endpoint;
    const res = await fetch(BASE_URL + endpointWithParam, {
      method: 'GET',
      credentials: 'include',

      headers: authHeaderObj(token),
    });

    return await res.json();
  },

  post: async (endpoint: TEndpoint, data: unknown = null) => {
    const token = await currentUser?.getIdToken();

    const res = await fetch(BASE_URL + endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
        ...authHeaderObj(token),
      },
    });

    return await res.json();
  },

  postFile: async (endpoint: TEndpoint, data: FormData) => {
    const token = await currentUser?.getIdToken();

    const res = await fetch(BASE_URL + endpoint, {
      method: 'POST',
      body: data,
      credentials: 'include',

      headers: authHeaderObj(token),
    });
    return await res.json();
  },

  put: async (endpoint: TEndpoint, data: unknown = null) => {
    const token = await currentUser?.getIdToken();

    const res = await fetch(BASE_URL + endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
        ...authHeaderObj(token),
      },
    });

    return await res.json();
  },

  delete: async (endpoint: TEndpoint, data: unknown = null) => {
    const token = await currentUser?.getIdToken();

    const res = await fetch(BASE_URL + endpoint, {
      method: 'DELETE',
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
        ...authHeaderObj(token),
      },
    });

    return await res.json();
  },
};

export const authHeaderObj = (token: string | undefined) =>
  token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined;
