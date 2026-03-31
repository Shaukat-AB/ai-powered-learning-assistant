import { chat, startChat } from '@/services/ai/gen-ai';

import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

const AIStartChatKey = 'ai-start-chat';
const AIChatKey = 'ai-chat';

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
    mutationKey: [AIChatKey, name],
    retry: 3,
  });
};

export const useStartChatMutation = (name: string | undefined) => {
  return useMutation({
    mutationFn: async ({ pdfUrl }: { pdfUrl: string }) => {
      if (!prompt || !name) return;

      try {
        const res = await startChat({ pdfUrl: pdfUrl, name: name });

        if ('message' in res && !res?.success) {
          toast.error(res.message);
          return null;
        }

        return res;
      } catch (error) {
        toast.error('AI Failed to respond!');
        console.error('Start Chat Mutation:', error);
      }
    },
    mutationKey: [AIStartChatKey, name],
    retry: 3,
  });
};
