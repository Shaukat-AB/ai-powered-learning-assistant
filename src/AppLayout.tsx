import type { ReactElement } from 'react';

import { SidebarProvider } from './components/ui/sidebar';

import Header from './components/header/Header';
import AppSidebar from './components/sidebar/AppSidebar';
import { useAuth } from './context/AuthContext';
import AuthEmpty from './components/auth/AuthEmpty';

const AppLayout = ({ children }: { children: ReactElement }) => {
  const { isVerifying } = useAuth();

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="w-full">
        <Header />
        <main className="w-full py-(--main-py) flex justify-center min-h-(--main-h)">
          {!isVerifying ? children : <AuthEmpty />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
