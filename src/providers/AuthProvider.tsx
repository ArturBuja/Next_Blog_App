'use client';
import { signInWithCustomToken } from 'firebase/auth';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
export interface AuthContextProps {
  children: React.ReactNode;
  session: Session | null;
}
const AuthProvider = ({ children, session }: AuthContextProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
