import { PanelLeftIcon } from 'lucide-react';

import Navbar from './Navbar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '../ui/sidebar';

import { useSignOutMutation } from '@/hooks/auth';
import { useAuth } from '@/context/AuthContext';
import { Activity } from 'react';
import ButtonWithArrow from '../ui-blocks/ButtonWithArrow';

const AppSidebar = () => {
  const { user } = useAuth();

  const { mutate } = useSignOutMutation();
  const handleSignout = () => mutate();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-(--header-p) h-(--header-h) border-b text-accent-foreground font-semibold cursor-default">
        <h3 className="text-lg">AI Learning Assistant</h3>
      </SidebarHeader>

      <SidebarContent className="p-(--header-p) py-(--main-py)">
        <Navbar />
      </SidebarContent>

      <SidebarFooter className="py-(--header-p)">
        <SidebarTrigger className="md:hidden ml-auto">
          <PanelLeftIcon />
        </SidebarTrigger>
        <Activity mode={!user ? 'hidden' : 'visible'}>
          <ButtonWithArrow
            size={'lg'}
            variant={'outline'}
            onClick={handleSignout}
          >
            Sign Out
          </ButtonWithArrow>
        </Activity>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
