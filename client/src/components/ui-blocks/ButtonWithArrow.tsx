import { ArrowRightIcon } from 'lucide-react';

import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';

import { Activity } from 'react';

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
      disabled={loading}
      {...props}
    >
      <span className="inline-flex gap-1.5 shrink-0 items-center justify-center">
        {children}

        <Activity mode={loading ? 'visible' : 'hidden'}>
          <Spinner />
        </Activity>

        <Activity mode={!loading ? 'visible' : 'hidden'}>
          <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Activity>
      </span>
    </Button>
  );
};

export default ButtonWithArrow;
