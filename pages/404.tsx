'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

//styles
import styles from './404Page.module.css';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.margin = '0';
  }, []);
  return (
    <section className={styles.wrapper}>
      <div id={styles.background}></div>
      <div className={styles.top}>
        <h1>404</h1>
        <h3>page not found</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.ghostCopy}>
          <div className={styles.one}></div>
          <div className={styles.two}></div>
          <div className={styles.three}></div>
          <div className={styles.four}></div>
        </div>
        <div className={styles.ghost}>
          <div className={styles.face}>
            <div className={styles.eye}></div>
            <div className={styles.eyeRight}></div>
            <div className={styles.mouth}></div>
          </div>
        </div>
        <div className={styles.shadow}></div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.parahraph}>
          Boo, looks like a ghost stole this page!
        </p>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={() => router.back()}>
            Cofnij
          </button>
          <button className={styles.btn} onClick={() => router.push('/')}>
            Strona Główna
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.parahraph}>
          made by <Link href='https://codepen.io/juliepark'> julie</Link> ♡
        </p>
      </footer>
    </section>
  );
}
