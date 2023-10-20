import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

//components
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
//context
import { ThemeContextProvider } from '@/context/ThemeContext';
//providers
import ThemeProvider from '@/providers/ThemeProvider';
import AuthProvider from '@/providers/AuthProvider';
//styles
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

const inter = Inter({ subsets: ['latin'] });
export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      type: 'website',
      locale: 'pl',
      siteName: 'From Lines To Life',
      url: 'https://fromlinestolife.vercel.app/',
      title: 'From Lines To Life',
      description: 'Autorski Blog!',
    },
    title: 'From Lines To Life',
    description: 'Autorski Blog!',
    authors: [
      {
        name: 'Artur Buja',
      },
    ],

    applicationName: 'From Lines To Life',

    generator:
      'Blog, From Lines To Life, fromlinstolife, Artur Blog, Programowanie, Podróże, Jedzenie, Restauracje',
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
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
