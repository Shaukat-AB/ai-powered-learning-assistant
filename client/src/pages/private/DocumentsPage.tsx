import type { DocumentContext } from '@/components/documents/types';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EmptyDescription, EmptyTitle } from '@/components/ui/empty';

import PDFUploader from '@/components/documents/PDFUploader';
import useGetDocuments from '@/hooks/useGetDocuments';
import { Link, Outlet, useParams } from 'react-router';

const DocumentsPage = () => {
  const { data: docs } = useGetDocuments();
  const { id } = useParams();

  return !id ? (
    // Todo: make document uploadable feature.
    <CardContent className="w-full">
      <CardHeader className="flex items-center justify-between mb-(--main-py)">
        <div>
          <EmptyTitle className="text-2xl">
            <h2> Documents </h2>
          </EmptyTitle>
          <EmptyDescription>
            <p>Manage documents</p>
          </EmptyDescription>
        </div>

        <PDFUploader />
      </CardHeader>

      <CardContent className="w-full flex items-center justify-center gap-6">
        {docs?.map((doc) => (
          <Link key={doc?.id} to={`/documents/${doc.id}`}>
            <Card>
              <CardContent>{doc.name}</CardContent>
            </Card>
          </Link>
        ))}
      </CardContent>
    </CardContent>
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
