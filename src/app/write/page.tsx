'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.bubble.css';
import styles from './writePage.module.css';

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState('');
  const [title, setTitle] = useState('');
  const [catSlug, setCatSlug] = useState('');

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
            <input
              type='file'
              id='image'
              onChange={e => setFile(e.target.files?.[0] || null)}
              style={{ display: 'none' }}
            />
            <button className={styles.addButton}>
              <label htmlFor='image'>
                <Image src={'/image.png'} alt='' width={16} height={16} />
              </label>
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
