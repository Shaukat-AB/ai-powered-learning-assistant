import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import GenerateQuiz from '@/components/documents/GenerateQuiz';

const QuizzesPage = () => {
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
    </CardContent>
  );
};

export default QuizzesPage;
