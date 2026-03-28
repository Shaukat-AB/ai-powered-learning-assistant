import { useAuth } from '@/context/AuthContext';
import { signinGoggle, signout } from '@/services/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const signInMutationKey = ['signin'];
const signOutMutationKey = ['signout'];

export const useSignInMutation = () => {
  const authUser = useAuth();
  const { setAuthUser, setIsLoading } = authUser;

  return useMutation({
    mutationFn: async () => {
      let user = null;

      try {
        setIsLoading(true);
        user = await signinGoggle();
        if (user) toast.success('User signed in successfully!');
      } catch (error) {
        toast.error('Failed signing in!');
        console.error('Sign in error:', error);
      } finally {
        setAuthUser({
          ...authUser,
          user: user,
          isLoading: false,
        });
        return user;
      }
    },
    mutationKey: signInMutationKey,
  });
};

export const useSignOutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        await signout();
        toast.success('User signed out successfully!');
      } catch (error) {
        toast.error('Failed signing out!');
        console.error('Sign out error:', error);
      }
    },
    mutationKey: signOutMutationKey,
  });
};
