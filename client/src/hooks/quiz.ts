import type { TQuizResult } from '@/components/documents/types';

import { toast } from 'sonner';
import {
  deleteQuiz,
  generateQuiz,
  getQuizzes,
  updateQuizResult,
} from '@/services/quiz/quiz';

import { documentKeys } from './document';
import { dashboardKeys } from './dashboard';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { useQuizzesContext } from '@/context/QuizzesContext';
import { useLocation } from 'react-router';

export const quizKeys = {
  all: [...documentKeys.all, 'quizzes'] as const,
  quizzes: (name: string | undefined) =>
    name
      ? [...quizKeys.all, 'get-quizzes', name]
      : [...quizKeys.all, 'get-quizzes'],

  generate: () => [...quizKeys.all, 'generate-quiz'],
  delete: () => [...quizKeys.all, 'delete-quiz'],
  result: () => [...quizKeys.all, 'update-quiz-result'],
};

export const useGetQuizzes = (name: string | undefined) => {
  const { setQuizzes, setGoBackPath } = useQuizzesContext();
  const { pathname } = useLocation();

  return useQuery({
    queryKey: quizKeys.quizzes(name),

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
  });
};

export const useGenerateQuizMutation = () => {
  return useMutation({
    mutationKey: quizKeys.generate(),

    mutationFn: async ({ name, total }: { name: string; total: number }) => {
      try {
        return await generateQuiz(name, total);
      } catch (error) {
        toast.error('Failed to generate quiz');
        console.error('Failed to generate quiz: ', error);
      }
    },

    onSuccess: async (_data) =>
      await queryClient.invalidateQueries({
        queryKey: dashboardKeys.all,
        refetchType: 'all',
      }),
  });
};

export const useDeleteQuizMutation = () => {
  return useMutation({
    mutationKey: quizKeys.delete(),

    mutationFn: async (id: string) => {
      try {
        return await deleteQuiz(id);
      } catch (error) {
        toast.error('Failed to delete quiz');
        console.error('Failed to delete quiz: ', error);
      }
    },

    onSuccess: async (_data) =>
      await queryClient.invalidateQueries({
        queryKey: dashboardKeys.all,
        refetchType: 'all',
      }),
  });
};

export const useUpdateQuizResultMutation = () => {
  return useMutation({
    mutationKey: quizKeys.result(),

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

    onSuccess: (_data) =>
      queryClient.invalidateQueries({
        queryKey: quizKeys.all,
        refetchType: 'all',
      }),
  });
};
