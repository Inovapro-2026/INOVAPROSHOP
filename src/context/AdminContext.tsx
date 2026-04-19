import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdminLoaded: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdminLoaded, setIsAdminLoaded] = useState<boolean>(false);

  useEffect(() => {
    const session = localStorage.getItem('freelancepro_admin_session');
    if (session === 'active') {
      setIsAuthenticated(true);
    }
    setIsAdminLoaded(true);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Prompt credentials
    if (email === 'maiconsillva2025@gmail.com' && password === '1285041') {
      setIsAuthenticated(true);
      localStorage.setItem('freelancepro_admin_session', 'active');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('freelancepro_admin_session');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, isAdminLoaded }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
