import type { FallbackProps } from 'react-error-boundary';
import { RefreshCcwIcon } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import ButtonWithArrow from '@/components/ui-blocks/ButtonWithArrow';
import HTMLSEO from '@/components/other/HTMLSEO';

import { Link } from 'react-router';

export const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Empty>
      <HTMLSEO title="Error" />

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
          className="px-4 group"
          size={'lg'}
          variant={'accent-alt'}
          onClick={resetErrorBoundary}
        >
          <RefreshCcwIcon className="transition-transform duration-200 group-hover:-rotate-60" />
          Retry
        </Button>

        <Link to="/" reloadDocument>
          <ButtonWithArrow className="px-4" size={'lg'} asChild>
            Back to home page
          </ButtonWithArrow>
        </Link>
      </EmptyContent>
    </Empty>
  );
};

export default ErrorPage;
