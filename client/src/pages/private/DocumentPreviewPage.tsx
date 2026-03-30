import type { DocumentContext } from '@/components/documents/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOutletContext } from 'react-router';

const DocumentPreviewPage = () => {
  const { doc } = useOutletContext<DocumentContext>();

  return (
    <CardContent className="w-full min-h-screen">
      <Card className="w-full h-full">
        <CardHeader className="flex justify-between">
          <CardTitle>{doc?.name}</CardTitle>
          <Button
            className="text-secondary-foreground"
            variant={'link'}
            asChild
          >
            <a
              href={doc?.url}
              target="_blank"
              rel="noopener noreferer"
              referrerPolicy="no-referrer"
            >
              Open in New Tab
            </a>
          </Button>
        </CardHeader>

        <CardContent className="w-full min-h-fit h-full">
          <iframe
            className="w-full h-full rounded-xl"
            loading="lazy"
            src={doc?.url}
          />
        </CardContent>
      </Card>
    </CardContent>
  );
};

export default DocumentPreviewPage;
