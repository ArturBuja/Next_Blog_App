'use client';
import { useState, useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';
import styles from './authLinks.module.css';
import Link from 'next/link';

const AuthLinks = ({ email }: { email: string }) => {
  const [open, setOpen] = useState(false);
  const { status, data } = useSession();
  const linesStyle = useMemo(
    () => `${styles.line} ${open ? styles.open : styles.closed}`,
    [open]
  );

  const handleToggleBurgerMenu = () => {
    document.body.style.overflowY = open ? 'initial' : 'hidden';
    setOpen(!open);
  };

  return (
    <>
      {status === 'unauthenticated' ? (
        <Link href='/login' className={styles.link}>
          Zaloguj
        </Link>
      ) : (
        <>
          {data?.user?.email === email && (
            <Link href='/write' className={styles.link}>
              Napisz
            </Link>
          )}
          <span
            className={styles.link}
            onClick={() => {
              signOut();
              handleToggleBurgerMenu();
            }}
          >
            Wyloguj
          </span>
        </>
      )}
      <div onClick={handleToggleBurgerMenu} className={styles.burger}>
        <div className={linesStyle}></div>
        <div className={linesStyle}></div>
        <div className={linesStyle}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link onClick={handleToggleBurgerMenu} href='/'>
            Strona Główna
          </Link>
          <Link onClick={handleToggleBurgerMenu} href='/contact'>
            Kontakt
          </Link>
          <Link onClick={handleToggleBurgerMenu} href='/about'>
            O mnie
          </Link>
          {status === 'unauthenticated' ? (
            <Link onClick={handleToggleBurgerMenu} href='/login'>
              Zaloguj
            </Link>
          ) : (
            <>
              {data?.user?.email === 'artur.buja2@gmail.com' && (
                <Link onClick={handleToggleBurgerMenu} href='/write'>
                  Napisz
                </Link>
              )}
              <span
                className={`${styles.link} ${styles.logout}`}
                onClick={() => {
                  signOut();
                  handleToggleBurgerMenu();
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
