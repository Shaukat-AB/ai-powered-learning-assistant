import { NavLink } from 'react-router';
import { buttonVariants } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { useAuth } from '@/context/AuthContext';

const authNavLinks = [
  {
    title: 'dashboard',
    to: '/dashboard',
  },
  ,
  {
    title: 'documents',
    to: '/documents',
  },
  ,
];

const publicNavLinks = [
  {
    title: 'overview',
    to: '/',
  },
];

const Navbar = () => {
  const { user, isLoading } = useAuth();
  const isLoggedin = user;
  const navLinks = isLoggedin ? authNavLinks : publicNavLinks;

  return (
    <nav>
      <ul className="space-y-2">
        {navLinks.map((link) => (
          <li key={link?.title} className="w-full capitalize">
            {!isLoading ? (
              <NavLink
                to={link?.to || '/'}
                className={({ isActive }) =>
                  `w-full capitalize ${
                    isActive
                      ? buttonVariants({ variant: 'default', size: 'lg' })
                      : buttonVariants({ variant: 'outline', size: 'lg' })
                  }`
                }
              >
                {link?.title}
              </NavLink>
            ) : (
              <Skeleton
                className={buttonVariants({
                  className: 'w-full',
                  variant: 'outline',
                  size: 'lg',
                })}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
