import { generateQuiz } from '@/services/quiz/quiz';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const genQuizKey = ['generate-quiz'];

export const useGenerateQuizMutation = () => {
  return useMutation({
    mutationFn: async ({ name, total }: { name: string; total: number }) => {
      try {
        return await generateQuiz(name, total);
      } catch (error) {
        toast.error('Failed to upload document');
        console.error('Failed to upload document: ', error);
      }
    },

    mutationKey: genQuizKey,
  });
};
