import { toast } from 'sonner';

import { deleteQuiz, generateQuiz, getQuizzes } from '@/services/quiz/quiz';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

const queryQuizzesKey = 'quizzes';
const genQuizKey = ['generate-quiz'];
const deleteQuizKey = ['delete-quiz'];

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

export const useDeleteQuizMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return await deleteQuiz(id);
      } catch (error) {
        toast.error('Failed to delete quiz');
        console.error('Failed to delete quiz: ', error);
      }
    },

    mutationKey: deleteQuizKey,
    onSuccess: (_data) =>
      queryClient.invalidateQueries({
        queryKey: [queryQuizzesKey],
      }),
  });
};
