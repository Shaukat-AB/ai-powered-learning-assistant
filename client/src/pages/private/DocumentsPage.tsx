import type { DocumentContext } from '@/components/documents/types';

import { CardContent, CardHeader } from '@/components/ui/card';
import { EmptyDescription, EmptyTitle } from '@/components/ui/empty';

import PDFUploader from '@/components/documents/PDFUploader';
import DocumentCard from '@/components/documents/DocumentCard';
import DocumentsSkeleton from '@/components/documents/DocumentsSkeleton';
import DocumentsEmpty from '@/components/documents/DocumentsEmpty';
import HTMLSEO from '@/components/other/HTMLSEO';

import { useGetDocuments } from '@/hooks/document';
import { Outlet, useParams } from 'react-router';

const DocumentsPage = () => {
  const { data: docs, isLoading } = useGetDocuments();
  const { id } = useParams();

  return !id ? (
    <CardContent className="w-full">
      <HTMLSEO title="Documents" />

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

      {!isLoading && Array.isArray(docs) ? (
        docs.length === 0 ? (
          <DocumentsEmpty />
        ) : (
          <CardContent className="w-full flex flex-wrap items-center gap-6">
            {!isLoading ? (
              docs.map((doc) => <DocumentCard doc={doc} key={doc.id} />)
            ) : (
              <DocumentsSkeleton />
            )}
          </CardContent>
        )
      ) : (
        <CardContent className="w-full flex flex-wrap items-center gap-6">
          <DocumentsSkeleton />
        </CardContent>
      )}
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
