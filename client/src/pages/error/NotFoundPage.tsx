import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

import ButtonWithArrow from '@/components/ui-blocks/ButtonWithArrow';
import HTMLSEO from '@/components/other/HTMLSEO';

import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <Empty>
      <HTMLSEO title="Not Found - 404" />

      <EmptyHeader>
        <EmptyTitle className="text-6xl">404</EmptyTitle>
        <EmptyDescription className="text-lg">
          The page you're looking for doesn't exist.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Link to="/" className="w-full max-w-xs">
          <ButtonWithArrow className="w-full" size={'lg'} asChild>
            Back to home page
          </ButtonWithArrow>
        </Link>
      </EmptyContent>
    </Empty>
  );
};

export default NotFoundPage;
