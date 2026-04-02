import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { CardContent, CardDescription, CardTitle } from '../ui/card';

import { User } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import SignoutButton from '../auth/SignoutButton';
import { useTheme } from 'next-themes';

const UserAccountDropdown = () => {
  const { user } = useAuth();
  const { theme, setTheme, themes } = useTheme();

  return (
    <DropdownMenu defaultOpen={false}>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar
          size="lg"
          className="ring-offset-background ring-2 ring-primary/25 hover:ring-primary ring-offset-2"
        >
          <AvatarImage
            src={user?.photoURL ?? undefined}
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

        <CardContent className="space-y-1">
          <CardTitle>
            <h5>Themes</h5>
          </CardTitle>

          {themes.map((t) => (
            <Button
              key={t}
              onClick={() => setTheme(t)}
              variant={theme == t ? 'accent-alt' : 'accent'}
              className="w-full capitalize"
            >
              {t}
            </Button>
          ))}
        </CardContent>

        <DropdownMenuSeparator />

        <SignoutButton className="w-full" variant={'destructive'} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountDropdown;
