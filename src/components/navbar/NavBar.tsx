import React from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src='/github.png' alt='github' width={24} height={24} />
        <Image src='/gitlab.png' alt='gitlab' width={24} height={24} />
        <Image src='/linkedn.png' alt='linkedn' width={24} height={24} />
      </div>
      <div className={styles.logo}></div>
      <div className={styles.links}></div>
    </div>
  );
};

export default NavBar;
