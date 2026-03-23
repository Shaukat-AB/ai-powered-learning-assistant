import { Link } from 'react-router';
import type { FallbackProps } from 'react-error-boundary';

import { ArrowRight, RefreshCcwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

export const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle className="text-6xl">Error</EmptyTitle>
        <EmptyDescription className="text-lg">
          {(error instanceof Error && error && error.message) ||
            'Something went wrong'}
          !
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="flex-row justify-center gap-2">
        <Button
          className="text-md"
          size={'lg'}
          variant={'accent-alt'}
          onClick={resetErrorBoundary}
        >
          <RefreshCcwIcon />
          Retry
        </Button>
        <Button className="text-md" size={'lg'} asChild>
          <Link to="/" reloadDocument>
            Back to home page
            <ArrowRight />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default ErrorPage;
