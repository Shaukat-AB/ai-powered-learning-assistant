import { MenuIcon, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CardContent, CardDescription, CardTitle } from '../ui/card';
import { SidebarTrigger } from '../ui/sidebar';

import { Activity } from 'react';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const isLoggedin = !!user;
  const photoURL =
    typeof user?.photoURL == 'string' ? user.photoURL : undefined;

  return (
    <header className="flex items-center p-(--header-p) h-(--header-h) w-full">
      <SidebarTrigger className="md:hidden">
        <MenuIcon />
      </SidebarTrigger>

      <Activity mode={isLoggedin ? 'visible' : 'hidden'}>
        <CardContent className="flex items-center ml-auto">
          <Avatar
            size="lg"
            className="ring-offset-background ring-2 ring-primary/50 ring-offset-2"
          >
            <AvatarImage
              src={photoURL}
              referrerPolicy="no-referrer"
              alt={user?.displayName + "'s image"}
            ></AvatarImage>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>

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
