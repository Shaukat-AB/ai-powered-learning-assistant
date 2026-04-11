import { toast } from 'sonner';

import { chat } from '@/services/ai/gen-ai';
import { useMutation } from '@tanstack/react-query';

const aiChatKey = 'ai-chat';

export const useChatMutation = (name: string | undefined) => {
  return useMutation({
    mutationFn: async ({ prompt }: { prompt: string }) => {
      if (!prompt || !name) return;

      try {
        const res = await chat({ prompt: prompt, name: name });

        if (typeof res === 'object' && !res?.success) toast.error(res?.message);

        return res;
      } catch (error) {
        toast.error('AI Failed to respond!');
        console.error('Chat Mutation:', error);
      }
    },
    mutationKey: [aiChatKey, name],
    retry: 3,
  });
};
