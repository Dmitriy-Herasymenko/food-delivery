import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken_] = useState<string | null>(localStorage.getItem('token'));

  const setAuthHeaders = (newToken: string | null) => {
    if (newToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      localStorage.setItem('token', newToken);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
    setAuthHeaders(newToken);
  };

  useEffect(() => {
    setAuthHeaders(token);
  }, [token]);

  const contextValue: AuthContextType = useMemo(() => ({
    token,
    setToken,
  }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
