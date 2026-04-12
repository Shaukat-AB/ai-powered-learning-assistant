import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { RadioGroup } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import LabelRadioItem from '@/components/ui-blocks/LabelRadioItem';
import HTMLSEO from '@/components/other/HTMLSEO';

import { useQuizzesContext } from '@/context/QuizzesContext';
import { Activity, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useUpdateQuizResultMutation } from '@/hooks/quiz';

type TQuizData = {
  [key: string]: {
    checkedValue: string;
    checkedIndex: number;
    isCorrect: boolean;
  };
};

const TakeQuizPage = () => {
  const { mutateAsync, isPending } = useUpdateQuizResultMutation();

  const { id } = useParams();
  const { getQuizById, updateQuiz } = useQuizzesContext();
  const navigate = useNavigate();

  const [data, setData] = useState<TQuizData>({});
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const timeRef = useRef<number>(null);

  const quiz = getQuizById(id);
  const currentQuestion = quiz?.questions[currentQIndex];

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!quiz?.questions) return;

    const checkedIndexes: number[] = [];
    let checkedRight = 0;
    let checkedWrong = 0;

    quiz?.questions.forEach((q) => {
      if (data[q.question]) checkedIndexes.push(data[q.question].checkedIndex);
      else checkedIndexes.push(-1);

      if (data[q.question]?.isCorrect) checkedRight += 1;
      else checkedWrong += 1;
    });

    const score = Math.floor((checkedRight * 100) / quiz.questions.length);
    const secondsTaken = Math.floor(
      ((timeRef.current && Date.now() - timeRef.current) || 0) / 1000
    );

    const sameResult =
      quiz.result &&
      quiz.result.checkedIndexes.every(
        (value, i) => value === checkedIndexes[i]
      );

    if (sameResult) {
      toast.error(
        'Failed to Submit! Your result is same as your previous result.'
      );
      return;
    }

    const result = {
      checkedIndexes,
      score,
      secondsTaken,
      checkedRight,
      checkedWrong,
    };

    updateQuiz({
      ...quiz,
      result,
    });

    await mutateAsync({ quizId: quiz.id, result });

    navigate(`/quiz-result/${id}`);
  };

  useEffect(() => {
    timeRef.current = Date.now();
  }, []);

  if (!quiz || !currentQuestion) return <Navigate to={'/documents'} />;

  return (
    <CardContent className="w-full h-full">
      <HTMLSEO title="Take Quiz" />

      <CardHeader className="relative space-y-4 h-(--tab-header-h)">
        <CardTitle>
          <h1>{quiz?.title}</h1>
        </CardTitle>

        <Progress
          className="[&>div]:rounded-l-full [&>div]:bg-linear-to-r [&>div]:from-emerald-300 [&>div]:via-green-500 [&>div]:to-emerald-500"
          value={((currentQIndex + 1) * 100) / quiz.questions.length}
        />
      </CardHeader>

      <form
        onSubmit={handleSubmit}
        className="min-h-fit h-(--tab-page-h) space-y-4"
      >
        <Card className="h-6/7">
          <CardHeader className="space-y-2">
            <CardDescription>
              <p>{`Question ${currentQIndex + 1}`}</p>
            </CardDescription>
            <CardTitle>
              <h2>{currentQuestion?.question}</h2>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <RadioGroup
              value={data[currentQuestion.question]?.checkedValue ?? ''}
              onValueChange={(value) =>
                setData({
                  ...data,
                  [currentQuestion.question]: {
                    checkedValue: value,
                    checkedIndex: currentQuestion.options.findIndex(
                      (v) => v === value
                    ),
                    isCorrect:
                      currentQuestion?.correctAnswerIndex ===
                      currentQuestion.options.findIndex((v) => v === value),
                  },
                })
              }
            >
              {currentQuestion?.options.map((opt, i) => (
                <LabelRadioItem id={`options-${i + 1}`} key={opt} value={opt} />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <CardContent className="min-h-1/7! flex items-center justify-between">
          <Button
            type="button"
            className="mr-auto px-4"
            size={'lg'}
            onClick={() => setCurrentQIndex(currentQIndex - 1)}
            disabled={currentQIndex < 1 || isPending}
          >
            Previous
          </Button>

          <Activity
            mode={
              currentQIndex + 1 === (quiz?.questions.length || 0)
                ? 'hidden'
                : 'visible'
            }
          >
            <Button
              type="button"
              variant={'default'}
              className="px-4"
              size={'lg'}
              onClick={() => setCurrentQIndex(currentQIndex + 1)}
            >
              Next
            </Button>
          </Activity>

          <Activity
            mode={
              currentQIndex + 1 === (quiz?.questions.length || 0)
                ? 'visible'
                : 'hidden'
            }
          >
            <Button
              type="submit"
              className="px-4"
              variant={'default'}
              size={'lg'}
              disabled={isPending}
            >
              Submit
              {isPending && <Spinner />}
            </Button>
          </Activity>
        </CardContent>
      </form>
    </CardContent>
  );
};

export default TakeQuizPage;
