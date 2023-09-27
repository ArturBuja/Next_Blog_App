import React from 'react';

import Link from 'next/link';

//styles
import AuthLinks from '@/components/authLinks/AuthLinks';
import ThemeToggle from '@/components/themeToogle/ThemeToggle';
import Socials from '@/components/organism/Socials';
//components
import styles from './navbar.module.css';

const NavBar = () => {
  const email = process.env.ADMIN_EMAIL || '';
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
        <AuthLinks email={email} />
      </div>
    </div>
  );
};

export default NavBar;
