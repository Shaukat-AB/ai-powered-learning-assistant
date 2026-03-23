import { MessageSquare } from 'lucide-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty';

const ChatEmpty = () => {
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
        <EmptyDescription>Ask a question or choose a topic.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default ChatEmpty;
