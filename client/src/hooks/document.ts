import { toast } from 'sonner';
import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from '@/services/document/document';

import { queryDashboardKey } from './dashboard';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

export const queryDoumentsKey = 'documents';
const uploadDoumentKey = 'upload-document';
const deleteDocumentKey = 'delete-document';

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
    queryKey: [queryDoumentsKey],
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

    mutationKey: [uploadDoumentKey],

    onSuccess: async (_data) =>
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === queryDoumentsKey || queryKey[0] === queryDashboardKey,
        refetchType: 'all',
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

    mutationKey: [deleteDocumentKey],

    onSuccess: async (_data) =>
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === queryDoumentsKey || queryKey[0] === queryDashboardKey,
        refetchType: 'all',
      }),
  });
};
