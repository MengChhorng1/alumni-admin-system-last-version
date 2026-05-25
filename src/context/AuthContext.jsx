import { createContext, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { loginApi } from '../services/mockApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('alumni_token'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('alumni_user') || 'null'));

  const login = async (credentials) => {
    const result = await loginApi(credentials);
    localStorage.setItem('alumni_token', result.token);
    localStorage.setItem('alumni_user', JSON.stringify(result.user));
    setToken(result.token);
    setUser(result.user);
    toast.success('Welcome back, admin!');
  };

  const logout = () => {
    localStorage.removeItem('alumni_token');
    localStorage.removeItem('alumni_user');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully.');
  };

  const can = (permission) => user?.permissions?.includes('*') || user?.permissions?.includes(permission);
  const value = useMemo(() => ({ token, user, isAuthenticated: Boolean(token), login, logout, can }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
