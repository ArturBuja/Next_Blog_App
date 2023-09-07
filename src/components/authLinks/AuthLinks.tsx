'use client';
import { useState, useMemo } from 'react';
import styles from './authLinks.module.css';
import Link from 'next/link';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const status = 'nonauthenticated';
  const linesStyle = useMemo(
    () => `${styles.line} ${open ? styles.open : styles.closed}`,
    [open]
  );

  return (
    <>
      {status === 'nonauthenticated' ? (
        <Link href='/login' className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href='/write' className={styles.link}>
            Write
          </Link>
          <span className={styles.link}>Logout</span>
        </>
      )}
      <div onClick={() => setOpen(!open)} className={styles.burger}>
        <div className={linesStyle}></div>
        <div className={linesStyle}></div>
        <div className={linesStyle}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href='/'>Home</Link>
          <Link href='/'>Contact</Link>
          <Link href='/'>About</Link>
          {status === 'nonauthenticated' ? (
            <Link href='/login'>Login</Link>
          ) : (
            <>
              <Link href='/write'>Write</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
