import { toast } from 'sonner';

import { generateQuiz, getQuizzes } from '@/services/quiz/quiz';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

const genQuizKey = ['generate-quiz'];
const queryQuizzesKey = 'quizzes';

export const useGetQuizzes = (name: string | undefined) => {
  return useQuery({
    queryFn: async () => {
      try {
        if (!name) return null;

        return await getQuizzes(name);
      } catch (error) {
        toast.error('Failed to get quizzes');
        console.error('Failed to get quizzes: ', error);
      }
      return null;
    },
    queryKey: [queryQuizzesKey, name],
  });
};

export const useGenerateQuizMutation = () => {
  return useMutation({
    mutationFn: async ({ name, total }: { name: string; total: number }) => {
      try {
        return await generateQuiz(name, total);
      } catch (error) {
        toast.error('Failed to generate quiz');
        console.error('Failed to generate quiz: ', error);
      }
    },

    mutationKey: genQuizKey,
    onSuccess: (_data) =>
      queryClient.invalidateQueries({
        queryKey: [queryQuizzesKey],
      }),
  });
};
