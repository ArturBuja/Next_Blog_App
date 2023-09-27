import React from 'react';

import Link from 'next/link';

//components
import Socials from '@/components/organism/Socials';
//styles
import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          {/* <Image src='/logo.png' alt='logo' width={50} height={50} /> */}
          <h1 className={styles.logoText}>from lines to life</h1>
        </div>
        <p className={styles.desc}>
          To osobisty blog, który oferuje różnorodność tematów, obejmując
          programowanie, relacje z podróży, kulinarne eksploracje oraz ogólny
          styl życia.
        </p>
        <div className={styles.icons}>
          <Socials />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Linki</span>
          <Link href='/' className={styles.link}>
            Główna
          </Link>
          <Link href='/contact' className={styles.link}>
            Kontakt
          </Link>
          <Link href='/about' className={styles.link}>
            O mnie
          </Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tagi</span>
          <Link href='/blog?cat=coding' className={styles.link}>
            Coding
          </Link>
          <Link href='/blog?cat=style' className={styles.link}>
            Lifestyle
          </Link>
          <Link href='/blog?cat=travel' className={styles.link}>
            Travel
          </Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/ArturBuja'
            className={styles.link}
          >
            GitHub
          </Link>
          <Link
            target='_blank'
            rel='noopener noreferrer'
            href='https://gitlab.com/ArturBuja'
            className={styles.link}
          >
            GitLab
          </Link>
          <Link
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.linkedin.com/in/artur-buja/'
            className={styles.link}
          >
            Linkedin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
