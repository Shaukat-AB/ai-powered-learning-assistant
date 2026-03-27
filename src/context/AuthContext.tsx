import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
} from 'react';

import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export type TUser = {
  isVerifying: boolean;

  isLoading: boolean;
  setIsLoading: (isLoading: false | true) => void;

  user: User | null;
  setAuthUser: (authUser: TUser) => void;
};

const initialUser: TUser = {
  isVerifying: true,

  isLoading: false,
  setIsLoading: (_v) => null,

  user: null,
  setAuthUser: (_v) => null,
};

const AuthContext = createContext<TUser>(initialUser);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [authUser, setAuthUser] = useState<TUser>(initialUser);

  const setIsLoading = (newValue: boolean) => {
    setAuthUser({
      ...authUser,
      isLoading: newValue,
    });
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (newUser) => {
      setAuthUser({
        ...authUser,
        user: newUser,
        isVerifying: false,
      });
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authUser,
        setIsLoading: setIsLoading,
        setAuthUser: setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
