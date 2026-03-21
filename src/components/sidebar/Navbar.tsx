import { NavLink } from 'react-router';
import { buttonVariants } from '../ui/button';
import { isLoading, isLoggedin } from '@/temp-constants';
import { Skeleton } from '../ui/skeleton';

const navLinks = isLoggedin
  ? [
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
    ]
  : [
      {
        title: 'overview',
        to: '/',
      },
    ];

const Navbar = () => {
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
