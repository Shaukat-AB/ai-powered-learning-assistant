import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

import { ArrowRight } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle className="text-6xl">404</EmptyTitle>
        <EmptyDescription className="text-lg">
          The page you're looking for doesn't exist.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button className="text-md" size={'lg'} asChild>
          <Link to="/">
            Back to home page
            <ArrowRight />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default NotFoundPage;
