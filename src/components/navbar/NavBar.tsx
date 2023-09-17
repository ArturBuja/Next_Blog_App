import React from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';
import AuthLinks from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToogle/ThemeToggle';
import Socials from '../organism/Socials';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Socials />
      </div>
      <div className={styles.logo}>
        <Link href='/'>from Lines to Life</Link>
      </div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href='/' className={styles.link}>
          Główna
        </Link>
        <Link href='/contact' className={styles.link}>
          Kontakt
        </Link>
        <Link href='/about' className={styles.link}>
          O mnie
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default NavBar;
