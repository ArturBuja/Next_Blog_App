import { Analytics } from '@vercel/analytics/react';
import NavBar from '@/components/navbar/NavBar';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer/Footer';
import { ThemeContextProvider } from '@/context/ThemeContext';
import ThemeProvider from '@/providers/ThemeProvider';
import AuthProvider from '@/providers/AuthProvider';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { Session } from 'next-auth';

const inter = Inter({ subsets: ['latin'] });

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });
  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export const metadata: Metadata = {
  title: 'From Lines To Life',
  description: 'Autorski Blog!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get('cookie') ?? '');
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className='container'>
                <div className='wrapper'>
                  <NavBar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
