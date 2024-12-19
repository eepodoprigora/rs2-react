import { createContext, ReactNode, useState, useContext } from "react";
import { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("user") || null;
  });

  const signin = (newUser: string, callback: () => void) => {
    localStorage.setItem("user", newUser);
    setUser(newUser);
    callback();
  };

  const signout = (callback: () => void) => {
    localStorage.removeItem("user");
    setUser(null);
    callback();
  };

  const value = {
    user,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
