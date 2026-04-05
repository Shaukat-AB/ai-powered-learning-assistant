import { MessageSquare } from 'lucide-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

const ChatEmpty = ({ isLoading = false }) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia
          className="size-12 bg-primary-foreground text-primary"
          variant="icon"
        >
          <MessageSquare className="size-6" />
        </EmptyMedia>

        <EmptyTitle className="text-lg">Start a learning session</EmptyTitle>
        <EmptyDescription className="flex items-center justify-center gap-2">
          Ask a question or choose a topic.
          {isLoading && <Spinner />}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default ChatEmpty;
