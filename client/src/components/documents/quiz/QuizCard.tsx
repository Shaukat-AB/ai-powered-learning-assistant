import type { TQuiz } from '../types';

import { List, ListCheck, PlayIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import AlertDelete from '@/components/ui-blocks/AlertDelete';

import { Link } from 'react-router';
import { useDeleteQuizMutation } from '@/hooks/quiz';

const QuizCard = ({ quiz }: { quiz: TQuiz }) => {
  const { mutate, isPending } = useDeleteQuizMutation();

  return (
    <Card className="document-card group">
      <CardHeader className="w-full space-y-6">
        <div className="w-full max-w-none flex justify-between">
          <div
            className={`${buttonVariants({
              variant: 'accent',
              size: 'icon',
            })} pointer-events-none`}
          >
            <List />
          </div>

          <AlertDelete
            title="Delete quiz?"
            description="This will permanently remove the selected quiz. This action can not be undone."
            onDelete={() => {
              mutate(quiz.id);
            }}
            isPending={isPending}
          />
        </div>

        <div>
          <CardTitle className="w-full min-w-0 line-clamp-1">
            <h4>{quiz.title}</h4>
          </CardTitle>

          <CardDescription>
            <p>
              <small>
                Questions: {quiz.questions.length.toString().padStart(2, '0')}
              </small>
            </p>
          </CardDescription>

          <CardDescription>
            <p>
              <small>
                {quiz?.createdAt
                  ? `Created At: ${new Date(quiz.createdAt).toDateString()}`
                  : 'Created At: unknown'}
              </small>
            </p>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {!quiz?.result ? (
          <Button className="w-full" size={'lg'} variant={'accent-alt'} asChild>
            <Link to={`/quiz/${quiz.id}`}>
              <PlayIcon />
              Take Quiz
            </Link>
          </Button>
        ) : (
          <Button className="w-full" size={'lg'} variant={'secondary'} asChild>
            <Link to={`/quiz-result/${quiz.id}`}>
              <ListCheck />
              Check Result
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;
