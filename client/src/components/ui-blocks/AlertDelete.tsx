import { Trash2Icon, XIcon } from 'lucide-react';
import { Spinner } from '../ui/spinner';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '../ui/button';
import { useState } from 'react';

const AlertDelete = ({
  title = 'Delete content?',
  description = 'HOLD ON! you are about to delete this content. This action cannot be undone.',
  isPending = false,
  onDelete,
}: {
  title?: string;
  description?: string;
  isPending?: boolean;
  onDelete?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={(v) => !isPending && setOpen(v)}>
      <AlertDialogTrigger className="z-1" asChild>
        <Button
          size={'icon'}
          className="not-group-hover:bg-accent not-group-hover:text-accent-foreground"
          variant={'destructive'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
          disabled={open}
        >
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="md:max-w-md! max-w-sm! w-full p-5">
        <AlertDialogHeader className="flex justify-between">
          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogCancel variant={'secondary'}>
            <XIcon />
            <span className="sr-only">Cancel</span>
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-center">
          {description}
        </AlertDialogDescription>

        <AlertDialogFooter className="flex-row justify-end bg-transparent mt-3">
          <AlertDialogCancel size={'lg'} className="sm:flex-1 w-fit min-w-28">
            Cancel
          </AlertDialogCancel>

          <Button
            size={'lg'}
            variant={'destructive'}
            className="sm:flex-1 min-w-28"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete && onDelete();
            }}
            disabled={isPending}
          >
            Delete
            {isPending && <Spinner />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDelete;
