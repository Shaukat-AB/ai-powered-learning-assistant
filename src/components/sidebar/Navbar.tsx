import { NavLink } from 'react-router';
import { buttonVariants } from '../ui/button';

const Navbar = () => {
  const navLinks = ['/dashboard', '/documents'];
  return (
    <nav>
      <ul className="space-y-2">
        {navLinks.map((link) => (
          <li key={link} className="w-full capitalize">
            <NavLink
              to={link}
              className={({ isActive }) =>
                `w-full capitalize ${
                  isActive
                    ? buttonVariants({ variant: 'default', size: 'lg' })
                    : buttonVariants({ variant: 'outline', size: 'lg' })
                }`
              }
            >
              {link.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
