import { MenuIcon } from 'lucide-react';

import { CardContent, CardDescription, CardTitle } from '../ui/card';
import { SidebarTrigger } from '../ui/sidebar';

import UserAccountDropdown from './UserAccountDropdown';

import { Activity } from 'react';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const isLoggedin = !!user;

  return (
    <header className="flex items-center p-(--header-p) h-(--header-h) w-full">
      <SidebarTrigger className="md:hidden">
        <MenuIcon />
      </SidebarTrigger>

      <Activity mode={isLoggedin ? 'visible' : 'hidden'}>
        <CardContent className="flex items-center ml-auto">
          <UserAccountDropdown />
          <CardContent className="px-3 hidden md:block">
            <CardTitle>{user?.displayName}</CardTitle>
            <CardDescription>Signed in</CardDescription>
          </CardContent>
        </CardContent>
      </Activity>
    </header>
  );
};

export default Header;
