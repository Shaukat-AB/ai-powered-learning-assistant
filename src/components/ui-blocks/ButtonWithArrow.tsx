import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Activity } from 'react';
import { Spinner } from '../ui/spinner';

const ButtonWithArrow = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { loading?: boolean }) => {
  return (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      className={`group ${className}`}
      {...props}
    >
      {children}

      <Activity mode={loading ? 'visible' : 'hidden'}>
        <Spinner />
      </Activity>

      <Activity mode={!loading ? 'visible' : 'hidden'}>
        <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Activity>
    </Button>
  );
};

export default ButtonWithArrow;
