import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { VisitorUser } from '../types';
import {
  signInWithGoogle as fbSignInWithGoogle,
  signOutVisitor as fbSignOutVisitor,
  onAuthUserChanged,
  getSavedVisitorUser,
} from '../utils/firebase';
import { isAuthorizedAdminEmail } from '../config/adminEmails';

interface AuthContextType {
  user: VisitorUser | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<boolean>;
  signOutUser: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  error: null,
  signInWithGoogle: async () => false,
  signOutUser: async () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<VisitorUser | null>(() => getSavedVisitorUser());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthUserChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = useMemo(() => {
    return isAuthorizedAdminEmail(user?.email);
  }, [user]);

  const signInWithGoogle = async (): Promise<boolean> => {
    setError(null);
    const res = await fbSignInWithGoogle();
    if (res.success && res.user) {
      setUser(res.user);
      return true;
    } else {
      setError(res.error || 'Failed to sign in with Google');
      return false;
    }
  };

  const signOutUser = async (): Promise<void> => {
    await fbSignOutVisitor();
    setUser(null);
    setError(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        error,
        signInWithGoogle,
        signOutUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
