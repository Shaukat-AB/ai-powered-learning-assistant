import { CircleQuestionMark } from 'lucide-react';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

const QuizzesEmpty = () => {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia
          className="size-12 bg-accent-foreground text-accent"
          variant="icon"
        >
          <CircleQuestionMark className="size-6" />
        </EmptyMedia>

        <EmptyTitle className="text-lg">No Quiz Was Generated</EmptyTitle>
        <EmptyDescription className="flex items-center justify-center gap-2">
          Generate new quiz to start taking quizzes.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default QuizzesEmpty;
