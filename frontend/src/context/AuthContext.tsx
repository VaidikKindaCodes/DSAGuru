import React, { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  SolvedQuestions: string[];
  BookmarkQuestions: string[];
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getCookie("token"));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cookieToken = getCookie("token");
    const storedUser = getCookie("user");
    if (cookieToken) setToken(cookieToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [token]);
  console.log(user)
  const logout = () => {
    setToken(null);
    setUser(null);
    document.cookie = "token=";
    document.cookie = "user="
    // localStorage.removeItem("user");
  };

  const isAuthenticated = useMemo(() => {
    return user ? true : false;
  },[user]);

  return (
    <AuthContext.Provider value={{ token, user, logout, isAuthenticated, loading  , setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
