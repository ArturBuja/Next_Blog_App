'use client';
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import styles from './loginPage.module.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const redirectToHome = () => {
      if (status === 'authenticated') {
        router.push('/');
      }
    };

    if (status === 'loading') {
      return;
    }

    redirectToHome();
  }, [router, status]);

  if (status === 'loading') {
    return <div className={styles.loading}>Ładowanie...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn('google')}>
          Zaloguj przez Google
        </div>
        <div className={styles.socialButton} onClick={() => signIn('github')}>
          Zaloguj przez Github
        </div>
        <div className={styles.socialButton} onClick={() => signIn('facebook')}>
          Zaloguj przez Facebook
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
