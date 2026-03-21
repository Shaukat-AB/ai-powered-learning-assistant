import { User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SidebarTrigger } from '../ui/sidebar';
import { CardContent, CardDescription, CardTitle } from '../ui/card';
import { Activity } from 'react';
import { isLoggedin } from '@/temp-constants';

const Header = () => {
  return (
    <header className="flex items-center p-(--header-p) h-(--header-h) w-full">
      <SidebarTrigger className="md:hidden" />

      <Activity mode={isLoggedin ? 'visible' : 'hidden'}>
        <CardContent className="flex items-center ml-auto">
          <Avatar size="lg">
            <AvatarImage src={undefined}></AvatarImage>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>

          <CardContent className="px-3 hidden md:block">
            <CardTitle>User</CardTitle>
            <CardDescription>useremail@gmail.com</CardDescription>
          </CardContent>
        </CardContent>
      </Activity>
    </header>
  );
};

export default Header;
