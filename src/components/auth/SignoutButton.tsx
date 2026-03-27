import ButtonWithArrow from '../ui-blocks/ButtonWithArrow';

import { useSignOutMutation } from '@/hooks/auth';

const SignoutButton = ({
  className = '',
  onClick,
  ...props
}: React.ComponentProps<typeof ButtonWithArrow>) => {
  const { mutate } = useSignOutMutation();
  const handleSignout = () => mutate();

  return (
    <ButtonWithArrow
      className={className}
      size={'lg'}
      variant={'outline'}
      onClick={handleSignout}
      {...props}
    >
      Sign Out
    </ButtonWithArrow>
  );
};

export default SignoutButton;
