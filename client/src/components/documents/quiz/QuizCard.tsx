import type { TQuiz } from '../types';

import { List, PlayIcon, Trash2Icon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';

import { Link } from 'react-router';
import { useDeleteQuizMutation } from '@/hooks/quiz';

const QuizCard = ({ quiz }: { quiz: TQuiz }) => {
  const { mutate, isPending } = useDeleteQuizMutation();

  return (
    <Card className="w-full lg:max-w-xs sm:max-w-3xs group hover:ring-primary/25 hover:-translate-y-0.5 duration-200 transition-all ease-out hover:shadow-sm will-change-transform">
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

          <Button
            size={'icon'}
            className="not-group-hover:bg-accent not-group-hover:text-accent-foreground"
            variant={'destructive'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              mutate(quiz.id);
            }}
            disabled={isPending}
          >
            <Trash2Icon />
          </Button>
        </div>

        <div>
          <CardTitle className="truncate">
            <h4>
              Questions: {quiz.questions.length.toString().padStart(2, '0')}
            </h4>
          </CardTitle>

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
        <Button className="w-full" size={'lg'} variant={'accent-alt'} asChild>
          <Link to={'/'}>
            <PlayIcon />
            Take Quiz
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
