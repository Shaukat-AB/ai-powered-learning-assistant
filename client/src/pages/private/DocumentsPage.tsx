import type { DocumentContext } from '@/components/documents/types';

import { CardContent, CardHeader } from '@/components/ui/card';
import { EmptyDescription, EmptyTitle } from '@/components/ui/empty';

import PDFUploader from '@/components/documents/PDFUploader';
import { useGetDocuments } from '@/hooks/document';
import { Outlet, useParams } from 'react-router';
import DocumentCard from '@/components/documents/DocumentCard';
import DocumentsSkeleton from '@/components/documents/DocumentsSkeleton';

const DocumentsPage = () => {
  const { data: docs, isLoading } = useGetDocuments();
  const { id } = useParams();

  return !id ? (
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
      <CardContent className="w-full flex flex-wrap items-center gap-6">
        {!isLoading && Array.isArray(docs) ? (
          docs.map((doc) => <DocumentCard doc={doc} key={doc.id} />)
        ) : (
          <DocumentsSkeleton />
        )}
      </CardContent>
    </CardContent>
  ) : (
    <Outlet
      context={
        {
          doc:
            (docs?.length && docs?.find((doc) => doc.id === id)) || undefined,
        } satisfies DocumentContext
      }
    />
  );
};

export default DocumentsPage;
