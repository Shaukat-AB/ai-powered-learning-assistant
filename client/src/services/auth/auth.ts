import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';

export const signinGoggle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  return res?.user ? res.user : null;
};

export const signout = async () => await signOut(auth);
