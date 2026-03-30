import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getDocuments, uploadDocument } from '@/services/document/document';

const queryDoumentsKey = ['documents'];
const uploadDoumentKey = ['upload-document'];

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
  });
};
