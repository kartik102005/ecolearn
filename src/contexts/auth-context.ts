import { createContext, useContext } from "react";
import type { AuthError, PostgrestError, Session, User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  level: number;
  total_xp: number;
  eco_coins: number;
  institution?: string | null;
  created_at: string;
  updated_at: string;
}

export type AuthResult = { error: AuthError | null };
export type ProfileResult = { error: PostgrestError | string | null };

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<ProfileResult>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
