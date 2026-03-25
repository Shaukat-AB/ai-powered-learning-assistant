import { getResponse } from '@/services/ai/gen-ai';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

const getAIResponseKey = 'ai-response';

export const useGetResponseMutation = () => {
  return useMutation({
    mutationFn: async ({
      prompt = '',
      instruction = '',
    }: {
      prompt: string;
      instruction?: string;
    }) => {
      if (!prompt) return;

      try {
        return await getResponse(prompt, instruction);
      } catch (error) {
        toast.error('AI Failed to respond!');
        console.error('Get AI Response:', error);
      }
    },
    mutationKey: [getAIResponseKey, prompt],
    retry: 3,
  });
};
