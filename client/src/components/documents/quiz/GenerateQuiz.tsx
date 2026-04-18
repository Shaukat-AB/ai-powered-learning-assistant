import type { DocumentContext } from '../types';

import { PlusIcon, XIcon } from 'lucide-react';

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
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

import { useGenerateQuizMutation } from '@/hooks/quiz';
import { useOutletContext } from 'react-router';
import { useEffect, useState } from 'react';

const invalidTotalMessage =
  'Total questions must be at least 3 and at most 100';

const GenerateQuiz = () => {
  const { doc } = useOutletContext<DocumentContext>();

  const [total, setTotal] = useState(5);
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending, error } = useGenerateQuizMutation();

  const invalidTotal = total < 3 || total > 100;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (invalidTotal) {
      toast.error(invalidTotalMessage);
      return;
    }

    const generated = await mutateAsync({
      total: total,
      name: doc?.name ?? '',
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if ('message' in generated && !generated?.success) {
      toast.error(generated.message);
    }

    if (typeof generated === 'object' && Array.isArray(generated?.questions)) {
      toast.success(
        `Generated ${generated.questions?.length || 0} questions successfully`
      );
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setTotal(5);
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={(v) => !isPending && setOpen(v)}>
      <AlertDialogTrigger asChild>
        <Button size={'lg'} variant={'default-alt'}>
          <PlusIcon />
          Generate Quiz
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="md:max-w-md! max-w-sm! w-full p-5">
        <AlertDialogHeader className="flex justify-between">
          <div className="text-left">
            <AlertDialogTitle>Generate New Quiz</AlertDialogTitle>

            <AlertDialogDescription>
              Generate quiz to add new set of questions
            </AlertDialogDescription>
          </div>

          <AlertDialogCancel variant={'secondary'}>
            <XIcon />
            <span className="sr-only">Cancel</span>
          </AlertDialogCancel>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-2">
          <CardDescription>
            <label htmlFor="total-questions">Total Questions</label>
          </CardDescription>

          <div className="relative">
            <Input
              aria-description="number of questions to generate"
              name="total-questions"
              value={total}
              onChange={(e) => setTotal(parseInt(e.target.value || '0'))}
              type="number"
              aria-invalid={invalidTotal}
            />

            {invalidTotal && (
              <CardDescription className="absolute right-0 -bottom-5 text-destructive">
                <small className="lowercase">{invalidTotalMessage}</small>
              </CardDescription>
            )}
          </div>

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel size={'lg'} className="sm:flex-1 w-full">
              Cancel
            </AlertDialogCancel>

            <Button
              size={'lg'}
              className="sm:flex-1 w-full"
              type="submit"
              disabled={isPending}
            >
              Generate
              {isPending && <Spinner />}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GenerateQuiz;
