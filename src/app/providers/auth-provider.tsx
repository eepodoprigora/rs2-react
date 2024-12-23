import { ReactNode, useState } from "react";
import { AuthContext } from "../../entities/auth/model/authContext";

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
