import { Card, CardContent, CardDescription } from '@/components/ui/card';
import LoadingDots from '@/components/ui-blocks/LoadingDots';

import Markdown from '../Markdown';

export const ChatPrompt = ({ text = '' }) => {
  return (
    <Card className="ring-0 w-fit max-w-4/5 ml-auto bg-primary-foreground ">
      <CardContent>
        <CardDescription className="text-foreground">
          <p>{text}</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export const ChatResponse = ({
  text = '',
  isLoading = false,
  error = null,
}: {
  text: string;
  isLoading?: boolean;
  error?: Error | null;
}) => {
  return (
    <Card className="ring-0 w-fit max-w-4/5">
      <CardContent>
        <div>
          {!isLoading && text ? (
            <Markdown text={text} />
          ) : !error ? (
            <CardDescription className="text-accent-foreground flex items-center gap-2">
              <p>thinking</p>
              <LoadingDots />
            </CardDescription>
          ) : (
            <CardDescription className="text-destructive">
              <p>{error.message || 'Somthing Went Wrong!'}</p>
            </CardDescription>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
