import React, { useEffect, useState } from 'react';
import { AuthContext } from './auth-context';
import { blink } from '../blink/client';
import type { User, AuthContextType } from '../types/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user ? {
        id: state.user.id,
        email: state.user.email,
        displayName: state.user.displayName,
      } : null);
      setIsLoading(state.isLoading);
      setIsAuthenticated(state.isAuthenticated);
    });

    return unsubscribe;
  }, []);

  const login = (nextUrl?: string) => {
    blink.auth.login(nextUrl);
  };

  const logout = (redirectUrl?: string) => {
    blink.auth.logout(redirectUrl);
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      await blink.auth.updateMe({
        displayName: data.displayName,
      });
      
      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}