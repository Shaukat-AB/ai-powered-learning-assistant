import type { TQuizResult } from '@/components/documents/types';

import { toast } from 'sonner';
import {
  deleteQuiz,
  generateQuiz,
  getQuizzes,
  updateQuizResult,
} from '@/services/quiz/quiz';

import { queryDoumentsKey } from './document';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { useQuizzesContext } from '@/context/QuizzesContext';
import { useLocation } from 'react-router';

const queryQuizzesKey = 'quizzes';
const genQuizKey = 'generate-quiz';
const deleteQuizKey = 'delete-quiz';
const updateQuizResultKey = 'update-quiz';

export const useGetQuizzes = (name: string | undefined) => {
  const { setQuizzes, setGoBackPath } = useQuizzesContext();
  const { pathname } = useLocation();

  return useQuery({
    queryFn: async () => {
      try {
        if (!name) return null;

        const quizzes = await getQuizzes(name);
        setQuizzes(quizzes);
        setGoBackPath(pathname);

        return quizzes;
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

    mutationKey: [genQuizKey],
    onSuccess: async (_data) =>
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === queryQuizzesKey || queryKey[0] === queryDoumentsKey,
        refetchType: 'all',
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

    mutationKey: [deleteQuizKey],
    onSuccess: async (_data) =>
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === queryQuizzesKey || queryKey[0] === queryDoumentsKey,
        refetchType: 'all',
      }),
  });
};

export const useUpdateQuizResultMutation = () => {
  return useMutation({
    mutationFn: async ({
      quizId,
      result,
    }: {
      quizId: string;
      result: TQuizResult;
    }) => {
      try {
        const data = await updateQuizResult(quizId, result);

        if (data?.success) {
          toast.success('Result successfully submitted.');
        } else if (data?.message && !data?.success) {
          toast.error(data.message);
        }

        return data;
      } catch (error) {
        toast.error('Failed to update quiz result');
        console.error('Failed to update quiz result: ', error);
      }
    },

    mutationKey: [updateQuizResultKey],

    onSuccess: (_data) =>
      queryClient.invalidateQueries({
        queryKey: [queryQuizzesKey],
        refetchType: 'all',
      }),
  });
};
