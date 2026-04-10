import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleCheck,
  CircleCheckBig,
  CircleGauge,
  CircleX,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import CircularProgressWithLabel from '@/components/ui-blocks/CircularProgressWithLabel';
import LabelRadioItem from '@/components/ui-blocks/LabelRadioItem';

import { useQuizzesContext } from '@/context/QuizzesContext';
import { scoreLabel, toMinsSeconds, toStorkeCssClass } from '@/lib/utils';
import { Link, Navigate, useParams } from 'react-router';
import { RadioGroup } from '@/components/ui/radio-group';

const QuizResultsPage = () => {
  const { getQuizById, goBackPath } = useQuizzesContext();
  const { id } = useParams();

  const quiz = getQuizById(id);
  const result = quiz?.result;

  if (!quiz || !result) return <Navigate to={'/documents'} />;

  return (
    <CardContent className="w-full h-full space-y-16">
      <section className="w-full space-y-6">
        <CardHeader className="space-y-4 h-(--tab-header-h)">
          <Button className="mr-auto" variant={'ghost'} asChild>
            <Link to={goBackPath}>
              <ArrowLeftIcon />
              <span>Go back</span>
            </Link>
          </Button>
          <CardTitle>
            <h1>{quiz?.title}</h1>
          </CardTitle>
        </CardHeader>

        <Card className="flex items-center gap-6 justify-center text-center">
          <CardHeader className="space-y-4 w-full">
            <CircularProgressWithLabel
              strokeWidth={15}
              className="sm:h-50 sm:text-3xl h-48 text-xl font-bold w-full"
              backgroundProgressClassName={toStorkeCssClass(result.score, true)}
              progressClassName={toStorkeCssClass(result.score, false)}
              statusLabelText={scoreLabel(result.score)}
              showLabel
              modifyValue={(v) => `${v}%`}
              value={result.score}
            />
          </CardHeader>

          <CardContent className="w-full max-w-xs">
            <CardTitle className="sm:pb-4 pb-3">
              <h3>Statistics</h3>
            </CardTitle>

            <CardDescription className="space-y-1">
              <p className="flex justify-between ">
                <strong className="flex items-center gap-1">
                  <CircleCheck className="w-4" /> Right Answers
                </strong>
                <span>{result.checkedRight}</span>
              </p>

              <p className="flex justify-between">
                <strong className="flex items-center gap-1">
                  <CircleX className="w-4" />
                  Wrong Answers
                </strong>
                <span>{result.checkedRight + result.checkedWrong}</span>
              </p>

              <p className="flex justify-between">
                <strong className="flex items-center gap-1">
                  <CircleCheckBig className="w-4" />
                  Score
                </strong>
                <span>{result.score}%</span>
              </p>

              <p className="flex justify-between">
                <strong className="flex items-center gap-1">
                  <CircleGauge className="w-4" />
                  Time Taken
                </strong>
                <time> {toMinsSeconds(result.secondsTaken)}</time>
              </p>
            </CardDescription>
          </CardContent>

          <CardFooter className="bg-transparent w-full max-w-xs ">
            <Button
              className="w-full mx-auto"
              variant={'secondary'}
              size={'lg'}
              asChild
            >
              <Link to={`/quiz/${id}`}>
                Try Again <ArrowRightIcon />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="w-full space-y-6">
        <CardHeader>
          <CardTitle>
            <h2>Quiz Details</h2>
          </CardTitle>
        </CardHeader>

        {quiz.questions.map((q, qI) => (
          <Card key={q.question} className="w-full">
            <CardHeader className="space-y-2">
              <CardDescription>
                <p className="flex">
                  <span className="mr-auto">{`Question ${qI + 1}`}</span>
                  {result.checkedIndexes[qI] === -1 && <span>Skipped*</span>}
                </p>
              </CardDescription>

              <CardTitle>
                <h4>{q.question}</h4>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <RadioGroup disabled>
                {q?.options.map((opt, optI) => (
                  <LabelRadioItem
                    key={opt}
                    id={`options-${optI + 1}`}
                    value={opt}
                    variant={
                      optI === q.correctAnswerIndex ? 'correct' : 'incorrect'
                    }
                    forcecheck={
                      result.checkedIndexes[qI] === optI ||
                      optI === q.correctAnswerIndex
                    }
                  />
                ))}
              </RadioGroup>
            </CardContent>

            <CardFooter className="bg-transparent gap-4 items-start mt-2">
              <CardTitle>Explanation</CardTitle>
              <CardDescription>{q.explanation}</CardDescription>
            </CardFooter>
          </Card>
        ))}

        <CardContent className="py-4">
          <Button className="mx-auto flex w-full max-w-xs" size={'lg'} asChild>
            <Link to={goBackPath}>
              <span>Take More quizzes</span>
              <ArrowRightIcon />
            </Link>
          </Button>
        </CardContent>
      </section>
    </CardContent>
  );
};

export default QuizResultsPage;
