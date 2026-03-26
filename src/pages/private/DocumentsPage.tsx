import type { DocumentContext } from '@/components/documents/types';

import { Card, CardContent } from '@/components/ui/card';
import {
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

import useGetDocuments from '@/hooks/useGetDocuments';
import { Link, Outlet, useParams } from 'react-router';

const DocumentsPage = () => {
  const { data: docs } = useGetDocuments();
  const { id } = useParams();

  return !id ? (
    // Todo: make document uploadable feature.
    <EmptyContent>
      <EmptyHeader>
        <EmptyTitle className="text-2xl">
          <h2> Documents </h2>
        </EmptyTitle>
        <EmptyDescription>
          <p>Manage documents</p>
        </EmptyDescription>
      </EmptyHeader>
      <CardContent className="w-full flex items-center justify-center gap-6">
        {docs?.map((doc) => (
          <Link key={doc?.id} to={`/documents/${doc.id}`}>
            <Card>
              <CardContent>{doc.name}</CardContent>
            </Card>
          </Link>
        ))}
      </CardContent>
    </EmptyContent>
  ) : (
    <Outlet
      context={
        {
          doc:
            (docs?.length && docs?.filter((doc) => doc.id === id)[0]) ||
            undefined,
        } satisfies DocumentContext
      }
    />
  );
};

export default DocumentsPage;
