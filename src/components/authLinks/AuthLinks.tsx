'use client';
import { useState, useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';
import styles from './authLinks.module.css';
import Link from 'next/link';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const linesStyle = useMemo(
    () => `${styles.line} ${open ? styles.open : styles.closed}`,
    [open]
  );

  return (
    <>
      {status === 'unauthenticated' ? (
        <Link href='/login' className={styles.link}>
          Zaloguj
        </Link>
      ) : (
        <>
          <Link href='/write' className={styles.link}>
            Napisz
          </Link>
          <span className={styles.link} onClick={() => signOut()}>
            Wyloguj
          </span>
        </>
      )}
      <div onClick={() => setOpen(!open)} className={styles.burger}>
        <div className={linesStyle}></div>
        <div className={linesStyle}></div>
        <div className={linesStyle}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href='/'>Strona Główna</Link>
          <Link href='/'>Kontakt</Link>
          <Link href='/'>O mnie</Link>
          {status === 'unauthenticated' ? (
            <Link href='/login'>Zaloguj</Link>
          ) : (
            <>
              <Link href='/write'>Napisz</Link>
              <span className={styles.link}>Wyloguj</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
