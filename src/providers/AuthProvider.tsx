'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
export interface AuthContextProps {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
