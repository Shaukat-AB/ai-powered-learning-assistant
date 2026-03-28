import type { TDocument } from '@/components/documents/types';

import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

const mockDoumentsPath = '/mock-documents/document.json'; // temporary
const queryDoumentsKey = ['documents'];

const useGetDocuments = () => {
  return useQuery({
    queryFn: async () => {
      try {
        const res = await fetch(mockDoumentsPath);
        const data = await res.json();
        return data as Array<TDocument>;
      } catch (error) {
        toast.error('Failed to fetch documents');
        console.error('Failed to fetch documents', error);
      }
    },
    queryKey: queryDoumentsKey,
  });
};

export default useGetDocuments;
