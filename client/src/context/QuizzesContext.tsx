import type { TQuiz, TQuizzes } from '@/components/documents/types';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type TQuizzesContext = {
  goBackPath: string;
  setGoBackPath: (path: string) => void;

  quizzes: undefined | TQuizzes;
  setQuizzes: (newQuizzes: undefined | TQuizzes) => void;
  getQuizById: (quizId: string | undefined) => TQuiz | undefined;
  updateQuiz: (updatedQuiz: TQuiz) => void;
};

const QuizzesContext = createContext<TQuizzesContext>({
  goBackPath: '/',
  setGoBackPath: (_path) => null,

  quizzes: undefined,
  setQuizzes: (_v) => null,
  getQuizById: (_id) => undefined,
  updateQuiz: (_q) => null,
});

export const QuizzesProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<TQuizzes>();
  const [goBackPath, setGoBackPath] = useState('/');

  const updateQuiz = (updatedQuiz: TQuiz) => {
    if (!quizzes) return alert('went early');

    const rest = quizzes.filter((q) => q.id !== updatedQuiz.id);
    setQuizzes([...rest, updatedQuiz]);
  };

  return (
    <QuizzesContext.Provider
      value={{
        goBackPath,
        setGoBackPath,

        quizzes,
        setQuizzes,
        getQuizById: (id) =>
          (id && quizzes?.find((q) => q.id === id)) || undefined,
        updateQuiz,
      }}
    >
      {children}
    </QuizzesContext.Provider>
  );
};

export const useQuizzesContext = () => useContext(QuizzesContext);
