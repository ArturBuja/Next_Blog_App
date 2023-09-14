import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src='/logo.png' alt='logo' width={50} height={50} />
          <h1 className={styles.logoText}>from lines to life</h1>
        </div>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          deleniti facere repudiandae numquam quaerat voluptate!
        </p>
        <div className={styles.icons}>
          <Image src='/github.png' alt='github' width={18} height={18} />
          <Image src='/gitlab.png' alt='gitlab' width={18} height={18} />
          <Image src='/linkedn.png' alt='linkedn' width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Linki</span>
          <Link href='/' className={styles.link}>
            Główna
          </Link>
          <Link href='/' className={styles.link}>
            Kontakt
          </Link>
          <Link href='/' className={styles.link}>
            O mnie
          </Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tagi</span>
          <Link href='/' className={styles.link}>
            Coding
          </Link>
          <Link href='/' className={styles.link}>
            Style
          </Link>
          <Link href='/' className={styles.link}>
            ravel
          </Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href='/' className={styles.link}>
            GitHub
          </Link>
          <Link href='/' className={styles.link}>
            GitLab
          </Link>
          <Link href='/' className={styles.link}>
            Linkedn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
