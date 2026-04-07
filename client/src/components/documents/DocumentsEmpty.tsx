import { LibraryIcon } from 'lucide-react';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

const DocumentsEmpty = () => {
  return (
    <Empty className="h-(--tab-page-h)">
      <EmptyHeader>
        <EmptyMedia
          className="size-12 bg-accent-foreground text-accent"
          variant="icon"
        >
          <LibraryIcon className="size-6" />
        </EmptyMedia>

        <EmptyTitle className="text-lg">No Document Was Uploaded</EmptyTitle>
        <EmptyDescription className="flex items-center justify-center gap-2">
          Upload new document to start learning.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default DocumentsEmpty;
