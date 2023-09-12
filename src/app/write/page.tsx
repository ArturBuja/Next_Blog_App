'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.bubble.css';
import styles from './writePage.module.css';

const WritePage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const { data, status } = useSession();

  useEffect(() => {
    const redirectToHome = () => {
      if (status === 'unauthenticated') {
        router.push('/');
      }
    };

    if (status === 'loading') {
      return;
    }

    redirectToHome();
  }, [router, status]);

  if (status === 'loading') {
    return <div className={styles.loading}>Ładowanie...</div>;
  }

  return (
    <div className={styles.container}>
      <input type='text' className={styles.input} placeholder='Tytuł' />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src={'/plus.png'} alt='' width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <button className={styles.addButton}>
              <Image src={'/image.png'} alt='' width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src={'/external.png'} alt='' width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src={'/video.png'} alt='' width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme='bubble'
          value={value}
          onChange={setValue}
          placeholder='Napisz swoja historię..'
        />
      </div>
      <button className={styles.publish}>Publikuj</button>
    </div>
  );
};

export default WritePage;
