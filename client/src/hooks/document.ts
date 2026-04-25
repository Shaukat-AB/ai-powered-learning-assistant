import type { TDocument } from '@/components/documents/types';

import { toast } from 'sonner';
import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from '@/services/document/document';

import { dashboardKeys } from './dashboard';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

export const documentKeys = {
  all: [...dashboardKeys.all, 'documents'] as const,
  documents: () => [...documentKeys.all, 'get-documents'] as const,
  upload: () => [...documentKeys.all, 'upload-document'] as const,
  delete: () => [...documentKeys.all, 'delete-document'] as const,
};

export const useGetDocuments = () => {
  return useQuery({
    queryKey: documentKeys.documents(),

    queryFn: async (): Promise<Array<TDocument> | null> => {
      try {
        const data = await getDocuments();

        if (data?.message && !data?.success) {
          toast.error(data.message);
          return null;
        }

        return data;
      } catch (error) {
        toast.error('Failed to fetch documents');
        console.error('Failed to fetch documents: ', error);
      }
      return null;
    },
  });
};

export const useUploadDocumentMutation = () => {
  return useMutation({
    mutationKey: documentKeys.upload(),

    mutationFn: async (formData: FormData) => {
      try {
        const data = await uploadDocument(formData);

        if ((data?.message && !data?.success) || !data?.url) {
          toast.error(data?.message || 'Failed to upload document');
          return null;
        }

        toast.success('Document uploaded successfully');

        return data;
      } catch (error) {
        toast.error('Failed to upload document');
        console.error('Failed to upload document: ', error);
      }
    },

    onSuccess: async (_data) =>
      await queryClient.invalidateQueries({
        queryKey: dashboardKeys.all,
        refetchType: 'all',
      }),
  });
};

export const useDeleteDocumentMutation = () => {
  return useMutation({
    mutationKey: documentKeys.delete(),

    mutationFn: async (name: string) => {
      try {
        const data = await deleteDocument(name);

        if (data?.message && !data?.success) {
          toast.error(data.message);
          return null;
        }

        return data;
      } catch (error) {
        toast.error('Failed to delete document');
        console.error('Failed to delete document: ', error);
      }
    },

    onSuccess: async (_data) =>
      await queryClient.invalidateQueries({
        queryKey: dashboardKeys.all,
        refetchType: 'all',
      }),
  });
};
