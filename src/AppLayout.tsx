import type { ReactElement } from 'react';
import { Spinner } from './components/ui/spinner';

const AppLayout = ({ children }: { children: ReactElement }) => {
  const isLoading = false;

  return (
    <div className="flex gap-4">
      <span>AppLayout</span>
      <div className="flex-1 flex items-center justify-center h-screen">
        {isLoading ? <Spinner className="size-8" /> : children}
      </div>
    </div>
  );
};

export default AppLayout;
