import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/button';

const ButtonWithArrow: typeof Button = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  children,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      className={`group ${className}`}
      {...props}
    >
      {children}
      <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Button>
  );
};

export default ButtonWithArrow;
