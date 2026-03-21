import type { FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import {
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <section>
      <CardContent className="flex flex-col gap-1 items-center">
        <CardTitle className="text-6xl">Error!</CardTitle>

        <CardDescription className="text-xl">
          {(error instanceof Error && error && error.message) ||
            'Something went wrong'}
          !
        </CardDescription>

        <CardAction className="flex justify-center gap-2 w-full mt-2">
          <Button className="text-lg" size={'lg'} asChild>
            <Link to="/">Back to home page</Link>
          </Button>
          <Button
            className="text-lg"
            size={'lg'}
            variant={'secondary'}
            onClick={resetErrorBoundary}
          >
            Retry
          </Button>
        </CardAction>
      </CardContent>
    </section>
  );
};

export default ErrorPage;
