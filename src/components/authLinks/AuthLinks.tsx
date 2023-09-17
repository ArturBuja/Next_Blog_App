'use client';
import { useState, useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';
import styles from './authLinks.module.css';
import Link from 'next/link';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status, data } = useSession();
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
          {data?.user?.email === 'artur.buja2@gmail.com' && (
            <Link href='/write' className={styles.link}>
              Napisz
            </Link>
          )}
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
          <Link onClick={() => setOpen(false)} href='/'>
            Strona Główna
          </Link>
          <Link onClick={() => setOpen(false)} href='/contact'>
            Kontakt
          </Link>
          <Link onClick={() => setOpen(false)} href='/about'>
            O mnie
          </Link>
          {status === 'unauthenticated' ? (
            <Link onClick={() => setOpen(false)} href='/login'>
              Zaloguj
            </Link>
          ) : (
            <>
              {data?.user?.email === 'artur.buja2@gmail.com' && (
                <Link onClick={() => setOpen(false)} href='/write'>
                  Napisz
                </Link>
              )}
              <span
                className={styles.link}
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
              >
                Wyloguj
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
