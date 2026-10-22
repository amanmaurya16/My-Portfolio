import React, { createContext, useContext, useState, useEffect } from 'react';
import { VisitorUser } from '../types';

interface AuthContextType {
  user: VisitorUser | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  toggleAdminMode: () => void;
  signOutUser: () => Promise<void>;
  clearError: () => void;
}

const DRAFT_MODE_STORAGE_KEY = 'aman_maurya_portfolio_draft_mode_active';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: false,
  error: null,
  toggleAdminMode: () => {},
  signOutUser: async () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if draft mode was previously active or if the URL contains hash #admin
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const isHashAdmin = window.location.hash.toLowerCase().includes('admin');
      const isStored = localStorage.getItem(DRAFT_MODE_STORAGE_KEY) === 'true';
      return isHashAdmin || isStored;
    }
    return false;
  });

  const [user, setUser] = useState<VisitorUser | null>(() => {
    if (isAdmin) {
      return {
        uid: 'owner-local',
        displayName: 'Aman Maurya',
        email: 'amanmauryaji16@gmail.com',
        photoURL: null,
        isAdmin: true,
      };
    }
    return null;
  });

  useEffect(() => {
    if (isAdmin) {
      setUser({
        uid: 'owner-local',
        displayName: 'Aman Maurya',
        email: 'amanmauryaji16@gmail.com',
        photoURL: null,
        isAdmin: true,
      });
      localStorage.setItem(DRAFT_MODE_STORAGE_KEY, 'true');
    } else {
      setUser(null);
      localStorage.removeItem(DRAFT_MODE_STORAGE_KEY);
    }
  }, [isAdmin]);

  const toggleAdminMode = () => {
    setIsAdmin((prev) => !prev);
  };

  const signOutUser = async () => {
    setIsAdmin(false);
  };

  const clearError = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading: false,
        error: null,
        toggleAdminMode,
        signOutUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
