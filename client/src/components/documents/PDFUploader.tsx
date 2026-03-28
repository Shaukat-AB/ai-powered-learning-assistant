import { PlusIcon, Upload, XIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CardDescription } from '../ui/card';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

import { toast } from 'sonner';
import { useState } from 'react';

const maxSize = 1 * 1024 * 1024; // 1MB

const PDFUploader = () => {
  const [_pdf, setPdf] = useState<File>();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error('Upload Failed');
      return;
    }
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }
    if (file.size > maxSize) {
      toast.error('File size must be less than 1MB');
      return;
    }

    setPdf(file);
    setName(file.name);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setOpen(false);
    setPdf(undefined);
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => setOpen(v)}>
      <AlertDialogTrigger asChild>
        <Button size={'lg'} variant={'default-alt'}>
          <PlusIcon />
          Upload Document
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="md:max-w-md! max-w-sm! w-full p-5">
        <AlertDialogHeader className="flex justify-between">
          <div className="text-left">
            <AlertDialogTitle>
              <h3> Upload New Document</h3>
            </AlertDialogTitle>

            <AlertDialogDescription>
              <p>Upload PDF to add new document</p>
            </AlertDialogDescription>
          </div>
          <AlertDialogCancel variant={'secondary'}>
            <XIcon />
            <span className="sr-only">Cancel</span>
          </AlertDialogCancel>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-2">
          <CardDescription>
            <label htmlFor="name">Document Name</label>
          </CardDescription>
          <Input
            aria-description="name of uploaded pdf document"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />

          <CardDescription className="my-4">
            <label className="w-full space-y-2" htmlFor="pdf-document">
              <p>PDF Document</p>

              <p className="w-full text-center text-sm text-muted-foreground min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 transition-colors outline-none">
                <Upload className="h-24 w-24 p-4 mx-auto pointer-events-none" />
                <span> Click here to choose a document (Max: 1MB)</span>
              </p>
            </label>
          </CardDescription>
          <Input
            aria-description="the uploaded pdf document"
            id="pdf-document"
            name="pdf-document"
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="hidden"
          />

          <AlertDialogFooter>
            <AlertDialogCancel size={'lg'} className="sm:flex-1 w-full">
              Cancel
            </AlertDialogCancel>
            <Button size={'lg'} className="sm:flex-1 w-full" type="submit">
              Upload Document
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PDFUploader;
