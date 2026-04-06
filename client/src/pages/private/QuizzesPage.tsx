import type { DocumentContext } from '@/components/documents/types';

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import DocumentsSkeleton from '@/components/documents/DocumentsSkeleton';
import GenerateQuiz from '@/components/documents/quiz/GenerateQuiz';
import QuizzesEmpty from '@/components/documents/quiz/QuizzesEmpty';
import QuizCard from '@/components/documents/quiz/QuizCard';

import { useGetQuizzes } from '@/hooks/quiz';
import { useOutletContext } from 'react-router';

const QuizzesPage = () => {
  const { doc } = useOutletContext<DocumentContext>();

  const { data: quizzes, isLoading } = useGetQuizzes(doc?.name);

  return (
    <CardContent className="w-full">
      <CardHeader className="flex items-center justify-between mb-(--main-py)">
        <div>
          <CardTitle>
            <h2> Quizzes </h2>
          </CardTitle>
          <CardDescription>
            <p>Manage Quizzes</p>
          </CardDescription>
        </div>

        <GenerateQuiz />
      </CardHeader>

      {isLoading ? (
        <CardContent className="w-full flex flex-wrap items-center gap-6">
          <DocumentsSkeleton />
        </CardContent>
      ) : !quizzes?.length ? (
        <QuizzesEmpty />
      ) : (
        <CardContent className="w-full flex flex-wrap items-center gap-6">
          {quizzes.map((q) => (
            <QuizCard key={q.id} quiz={q} />
          ))}
        </CardContent>
      )}
    </CardContent>
  );
};

export default QuizzesPage;
