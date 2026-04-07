import type { TDocument } from './types';

import { FileText } from 'lucide-react';

import { buttonVariants } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

import AlertDelete from '../ui-blocks/AlertDelete';

import { Link } from 'react-router';
import { useDeleteDocumentMutation } from '@/hooks/document';

const DocumentCard = ({ doc }: { doc: TDocument }) => {
  const { mutate, isPending } = useDeleteDocumentMutation();

  return (
    <Card className="h-full document-card group relative">
      <Link className="absolute w-full h-full" to={`/documents/${doc.id}`}>
        <span className="sr-only">View document</span>
      </Link>

      <CardHeader className="w-full space-y-6">
        <div className="w-full max-w-none flex justify-between">
          <div
            className={`${buttonVariants({
              variant: 'accent',
              size: 'icon',
            })} group-hover:text-accent group-hover:bg-accent-foreground`}
          >
            <FileText />
          </div>

          <AlertDelete
            title="Delete document?"
            description="This will permanently remove the selected document. This action can not be undone."
            onDelete={() => {
              mutate(doc.name);
            }}
            isPending={isPending}
          />
        </div>
        <div>
          <CardTitle className="truncate">
            <h4>{doc.name}</h4>
          </CardTitle>

          <CardDescription>
            <p>
              <small>
                {doc.sizeBytes
                  ? (doc.sizeBytes / 1024).toFixed(2) + ' KB'
                  : 'unknown'}
              </small>
            </p>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription>
          <p>0 quizzes</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
