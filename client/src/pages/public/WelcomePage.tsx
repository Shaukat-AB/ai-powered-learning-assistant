import ButtonWithArrow from '@/components/ui-blocks/ButtonWithArrow';
import { CardContent, CardTitle } from '@/components/ui/card';

import { useSignInMutation } from '@/hooks/auth';

const WelcomePage = () => {
  const { mutate, isPending } = useSignInMutation();
  const handleGoogleLogin = () => mutate();

  return (
    <CardContent className="w-full h-full max-w-2xs flex items-center flex-col justify-center gap-5">
      <CardTitle className="text-2xl">Welcome</CardTitle>
      <ButtonWithArrow
        className="w-full"
        size={'lg'}
        variant={'outline'}
        loading={isPending}
        disabled={isPending}
        onClick={handleGoogleLogin}
      >
        <img
          src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png?width=20&height=20&format=auto"
          alt="Google Icon"
          className="size-5"
        />
        <span className="flex flex-1 justify-center">Continue with Google</span>
      </ButtonWithArrow>
    </CardContent>
  );
};

export default WelcomePage;
