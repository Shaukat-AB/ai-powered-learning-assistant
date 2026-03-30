import type { TDocument } from './types';

import { FileText, Trash2Icon } from 'lucide-react';

import { Button, buttonVariants } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { Link } from 'react-router';

const DocumentCard = ({ doc }: { doc: TDocument }) => {
  return (
    <Link
      className="w-full lg:max-w-xs sm:max-w-3xs group"
      key={doc?.id}
      to={`/documents/${doc.id}`}
    >
      <Card className="w-full h-full">
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
            <Button size={'icon'} variant={'destructive'}>
              <Trash2Icon />
            </Button>
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
    </Link>
  );
};

export default DocumentCard;
