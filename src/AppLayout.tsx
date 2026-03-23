import type { ReactElement } from 'react';

import Header from './components/header/Header';
import AppSidebar from './components/sidebar/AppSidebar';
import { SidebarProvider } from './components/ui/sidebar';

const AppLayout = ({ children }: { children: ReactElement }) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="w-full">
        <Header />
        <main className="w-full py-(--main-py) flex justify-center min-h-[calc(100vh-var(--header-h))]">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
