import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers, currentUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In a real app, we would check for a token in localStorage and validate it
  const [user, setUser] = useState<User | null>(currentUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic (would be an API call in production)
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password.length > 0) { // In a real app, we'd verify the password
        setUser(foundUser);
        setLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      setLoading(false);
      return false;
    }
  };

  const signup = async (userData: Partial<User>, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock signup logic (would be an API call in production)
      if (userData.email && mockUsers.some(u => u.email === userData.email)) {
        setError('Email already in use');
        setLoading(false);
        return false;
      }
      
      // Creating a new user would happen on the server
      // This is just for demonstration
      const newUser: User = {
        id: `u${mockUsers.length + 1}`,
        name: userData.name || 'New User',
        email: userData.email || '',
        rank: userData.rank || 'Lieutenant',
        unit: userData.unit || 'Unassigned',
        role: 'officer',
        location: userData.location || { lat: 32.7177, lng: 74.8573 },
      };
      
      // In a real app, we would save this user to the database
      // and then log them in
      setUser(newUser);
      setLoading(false);
      return true;
    } catch (err) {
      setError('An error occurred during signup');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    // In a real app, we would clear the token from localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      loading, 
      login, 
      signup, 
      logout, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};