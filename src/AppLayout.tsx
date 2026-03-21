import type { ReactElement } from 'react';

import { Spinner } from './components/ui/spinner';
import Header from './components/header/Header';
import { SidebarProvider } from './components/ui/sidebar';
import AppSidebar from './components/sidebar/AppSidebar';

const AppLayout = ({ children }: { children: ReactElement }) => {
  const isLoading = false;

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="w-full">
        <Header />
        <main className="flex-1 flex items-center justify-center h-[calc(100vh-var(--header-h))]">
          {isLoading ? <Spinner className="size-8" /> : children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
