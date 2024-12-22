import { ReactNode } from "react";

export interface CharactersData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: string;
}

export interface EpisodeData {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created: string;
}

export interface LocationData {
  id: number;
  name: string;
  type: string;
  dimension: string;
  created: string;
}

export interface AuthContextType {
  user: string | null;
  signin: (newUser: string, callback: () => void) => void;
  signout: (callback: () => void) => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export type ApiResponse<T> = {
  data: T[];
};
