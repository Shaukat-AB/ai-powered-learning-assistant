const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type TEndpoint =
  | '/api/ai/start-chat'
  | '/api/ai/chat'
  | '/api/document/'
  | '/api/document/delete'
  | '/api/document/upload';

export const apiClient = {
  get: async (endpoint: TEndpoint) => {
    const res = await fetch(BASE_URL + endpoint, {
      method: 'GET',
      credentials: 'include',
    });

    return await res.json();
  },

  post: async (endpoint: TEndpoint, data: unknown = null) => {
    const res = await fetch(BASE_URL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });

    return await res.json();
  },

  postFile: async (endpoint: TEndpoint, data: FormData) => {
    const res = await fetch(BASE_URL + endpoint, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    return await res.json();
  },

  put: async (endpoint: TEndpoint, data: unknown = null) => {
    const res = await fetch(BASE_URL + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });

    return await res.json();
  },

  delete: async (endpoint: TEndpoint, data: unknown = null) => {
    const res = await fetch(BASE_URL + endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });

    return await res.json();
  },
};
