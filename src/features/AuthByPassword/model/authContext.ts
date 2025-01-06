import { createContext } from "react";

interface AuthContextType {
  user: string | null;
  signin: (newUser: string, callback: () => void) => void;
  signout: (callback: () => void) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
