import { toast } from 'sonner';
import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from '@/services/document/document';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

export const queryDoumentsKey = ['documents'];
const uploadDoumentKey = ['upload-document'];
const deleteDocumentKey = ['delete-document'];

export const useGetDocuments = () => {
  return useQuery({
    queryFn: async () => {
      try {
        return await getDocuments();
      } catch (error) {
        toast.error('Failed to fetch documents');
        console.error('Failed to fetch documents: ', error);
      }
      return null;
    },
    queryKey: queryDoumentsKey,
  });
};

export const useUploadDocumentMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        return await uploadDocument(formData);
      } catch (error) {
        toast.error('Failed to upload document');
        console.error('Failed to upload document: ', error);
      }
    },

    mutationKey: uploadDoumentKey,
    onSuccess: (_data) =>
      queryClient.invalidateQueries({
        queryKey: queryDoumentsKey,
      }),
  });
};

export const useDeleteDocumentMutation = () => {
  return useMutation({
    mutationFn: async (name: string) => {
      try {
        return await deleteDocument(name);
      } catch (error) {
        toast.error('Failed to delete document');
        console.error('Failed to delete document: ', error);
      }
    },

    mutationKey: deleteDocumentKey,
    onSuccess: (_data) =>
      queryClient.invalidateQueries({
        queryKey: queryDoumentsKey,
      }),
  });
};
