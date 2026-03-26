import type { DocumentContext } from '@/components/documents/types';

import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ArrowLeftIcon } from 'lucide-react';

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router';
import { useEffect } from 'react';

const DoumentTabsPage = () => {
  const navigate = useNavigate();
  const context = useOutletContext<DocumentContext>();

  const { pathname } = useLocation();
  const tab = pathname.split('/').reverse()[0];

  const onValueChange = (v: string) => {
    switch (v) {
      case 'preview':
        navigate('preview');
        break;
      case 'chat':
        navigate('chat');
        break;
    }
  };

  useEffect(() => {
    navigate('preview');
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <CardHeader className="h-(--tab-header-h)">
        <Button className="mr-auto" variant={'ghost'} asChild>
          <Link to="/documents">
            <ArrowLeftIcon />
            <span>Go back</span>
          </Link>
        </Button>

        <Tabs defaultValue="preview" value={tab} onValueChange={onValueChange}>
          <TabsList className="gap-4" variant="line">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <Outlet context={context} />
    </div>
  );
};

export default DoumentTabsPage;
