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
  isLoading: false | true;
  user: User | null;
  setIsLoading: (isLoading: false | true) => void;
  setAuthUser: (authUser: TUser) => void;
};

const initialUser: TUser = {
  isLoading: false,
  user: null,
  setIsLoading: (_v) => null,
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
