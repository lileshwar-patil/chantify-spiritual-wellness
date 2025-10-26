import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, ZodiacSign } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
  signup: (email: string, name: string) => void;
  handleGoogleSignIn: (credentialResponse: any) => void;
  updateChantCount: (count: number) => void;
  updateZodiacSign: (sign: ZodiacSign) => void;
  loginAsGuest: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('chantifyUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('chantifyUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((email: string) => {
    // In a real app, this would be an API call.
    const storedUser = localStorage.getItem(`chantify-user-${email}`);
    if (storedUser) {
        const loggedInUser = JSON.parse(storedUser);
        setUser(loggedInUser);
        localStorage.setItem('chantifyUser', JSON.stringify(loggedInUser));
    } else {
        // User not found for password login
        console.error("No user found with this email for password login.");
    }
  }, []);

  const signup = useCallback((email: string, name: string) => {
    const newUser: User = {
      email,
      name,
      avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
      chantCount: 0,
    };
    setUser(newUser);
    localStorage.setItem('chantifyUser', JSON.stringify(newUser));
    localStorage.setItem(`chantify-user-${email}`, JSON.stringify(newUser));
  }, []);
  
  const handleGoogleSignIn = useCallback((credentialResponse: any) => {
    // Decode JWT token from Google
    const token = credentialResponse.credential;
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    const email = payload.email;
    const name = payload.name;
    const avatarUrl = payload.picture;
    
    const userKey = `chantify-user-${email}`;
    const storedUser = localStorage.getItem(userKey);

    if (storedUser) {
      // User exists, log them in
      const existingUser = JSON.parse(storedUser);
      // Update details just in case they changed
      existingUser.name = name;
      existingUser.avatarUrl = avatarUrl;
      setUser(existingUser);
      localStorage.setItem('chantifyUser', JSON.stringify(existingUser));
      localStorage.setItem(userKey, JSON.stringify(existingUser));
    } else {
      // User does not exist, sign them up
      const newUser: User = {
        email,
        name,
        avatarUrl,
        chantCount: 0,
      };
      setUser(newUser);
      localStorage.setItem('chantifyUser', JSON.stringify(newUser));
      localStorage.setItem(userKey, JSON.stringify(newUser));
    }
  }, []);
  
  const loginAsGuest = useCallback(() => {
    const guestUser: User = {
      name: 'Guest User',
      email: 'guest@chantify.app',
      avatarUrl: `https://i.pravatar.cc/150?u=guest`,
      chantCount: 0,
      isGuest: true,
    };
    setUser(guestUser);
    localStorage.setItem('chantifyUser', JSON.stringify(guestUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('chantifyUser');
  }, []);

  const updateChantCount = useCallback((count: number) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, chantCount: count };
      localStorage.setItem('chantifyUser', JSON.stringify(updatedUser));
      if (!prevUser.isGuest) {
        localStorage.setItem(`chantify-user-${updatedUser.email}`, JSON.stringify(updatedUser));
      }
      return updatedUser;
    });
  }, []);
  
  const updateZodiacSign = useCallback((sign: ZodiacSign) => {
    setUser(prevUser => {
        if (!prevUser) return null;
        const updatedUser = { ...prevUser, zodiacSign: sign };
        localStorage.setItem('chantifyUser', JSON.stringify(updatedUser));
        if (!prevUser.isGuest) {
            localStorage.setItem(`chantify-user-${updatedUser.email}`, JSON.stringify(updatedUser));
        }
        return updatedUser;
    });
  }, []);

  const value = { user, loading, login, logout, signup, handleGoogleSignIn, updateChantCount, updateZodiacSign, loginAsGuest };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};