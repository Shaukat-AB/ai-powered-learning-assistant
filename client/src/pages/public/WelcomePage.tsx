import { Sparkles } from 'lucide-react';

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import HTMLSEO from '@/components/other/HTMLSEO';
import ButtonWithArrow from '@/components/ui-blocks/ButtonWithArrow';

import { useSignInMutation } from '@/hooks/auth';

const WelcomePage = () => {
  const { mutate, isPending } = useSignInMutation();
  const handleGoogleLogin = () => mutate();

  return (
    <CardContent className="relative overflow-hidden w-full flex sm:items-start flex-col justify-center gap-8">
      <HTMLSEO title="Welcome" />

      <CardHeader className="w-full sm:text-left text-center space-y-2 max-w-lg">
        <CardTitle className="h1 sm:text-left! font-semibold!">
          <h1>Welcome Ready to grow?</h1>
        </CardTitle>

        <CardDescription>
          <p>
            Explore tailored pathways, chat with an AI tutor for on-demand help,
            and generate quizzes that sharpen your skills, get started today.
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full flex">
        <ButtonWithArrow
          className="w-fit sm:mx-0 mx-auto px-8 py-6"
          size={'lg'}
          variant={'accent-alt'}
          loading={isPending}
          disabled={isPending}
          onClick={handleGoogleLogin}
        >
          <img
            src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png?width=20&height=20&format=auto"
            alt="Google Icon"
            className="size-5"
          />
          <span className="flex flex-1 justify-center">
            Continue with Google
          </span>
        </ButtonWithArrow>
      </CardContent>

      <div className="absolute -right-[6%] -z-10 overflow-hidden">
        <Sparkles className="pointer-events-none size-[45vw] -rotate-8  text-muted-foreground/16" />
      </div>
    </CardContent>
  );
};

export default WelcomePage;
