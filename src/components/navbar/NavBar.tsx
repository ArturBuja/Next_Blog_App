import React from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AuthLinks from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToogle/ThemeToggle';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src='/github.png' alt='github' width={24} height={24} />
        <Image src='/gitlab.png' alt='gitlab' width={24} height={24} />
        <Image src='/linkedn.png' alt='linkedn' width={24} height={24} />
      </div>
      <div className={styles.logo}>Blog</div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href='/' className={styles.link}>
          Główna
        </Link>
        <Link href='/' className={styles.link}>
          Kontakt
        </Link>
        <Link href='/' className={styles.link}>
          O mnie
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default NavBar;
