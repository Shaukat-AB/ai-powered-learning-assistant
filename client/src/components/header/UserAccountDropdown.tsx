import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardContent, CardDescription, CardTitle } from '../ui/card';

import { User } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import SignoutButton from '../auth/SignoutButton';

const UserAccountDropdown = () => {
  const { user } = useAuth();
  const photoURL =
    typeof user?.photoURL == 'string' ? user.photoURL : undefined;

  return (
    <DropdownMenu defaultOpen={false}>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar
          size="lg"
          className="ring-offset-background ring-2 ring-primary/25 hover:ring-primary ring-offset-2"
        >
          <AvatarImage
            src={photoURL}
            rel="noopener noreferer"
            referrerPolicy="no-referrer"
            alt={user?.displayName + "'s image"}
          ></AvatarImage>
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        hidden={!user}
        align="center"
        className="w-full p-3 space-y-4"
      >
        <CardContent>
          <CardTitle>
            <h4>{user?.displayName}</h4>
          </CardTitle>
          <CardDescription>
            <p>{user?.email}</p>
          </CardDescription>
        </CardContent>
        <DropdownMenuSeparator />
        <SignoutButton className="w-full" variant={'destructive'} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountDropdown;
