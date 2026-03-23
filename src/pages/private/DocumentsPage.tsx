import { Button } from '@/components/ui/button';
import { EmptyContent, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { NavLink, Outlet, useLocation } from 'react-router';

const DocumentsPage = () => {
  const { pathname } = useLocation();
  const isChat = pathname.endsWith('chat');

  return !isChat ? (
    // Todo: make document uploadable feature.
    <EmptyContent>
      <EmptyHeader>
        <EmptyTitle className="text-2xl"> Documents </EmptyTitle>
      </EmptyHeader>
      <Button className="max-w-3xs w-full" size={'lg'} asChild>
        <NavLink to={'/documents/chat'}>Chat</NavLink>
      </Button>
    </EmptyContent>
  ) : (
    <Outlet />
  );
};

export default DocumentsPage;
