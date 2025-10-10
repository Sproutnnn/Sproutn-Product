import React, { useEffect, useState, createContext, useContext } from 'react';
import { authService, type User } from '../services/auth.service';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<Pick<User, 'name' | 'company_name' | 'email'>>) => Promise<void>;
  signUp: (email: string, password: string, name: string, companyName?: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      authService.getUserById(storedUserId).then((fetchedUser) => {
        if (fetchedUser) {
          setUser(fetchedUser);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('userId');
        }
      });
    }
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await authService.login({ email, password });
      setUser(loggedInUser);
      setIsAuthenticated(true);
      localStorage.setItem('userId', loggedInUser.id);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userId');
  };

  const updateUserProfile = async (data: Partial<Pick<User, 'name' | 'company_name' | 'email'>>) => {
    if (!user) return;

    try {
      const updatedUser = await authService.updateProfile(user.id, data);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string, companyName?: string) => {
    try {
      const newUser = await authService.signUp({
        email,
        password,
        name,
        companyName,
        role: 'customer'
      });
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('userId', newUser.id);
    } catch (error) {
      throw error;
    }
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    login,
    logout,
    updateUserProfile,
    signUp
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};