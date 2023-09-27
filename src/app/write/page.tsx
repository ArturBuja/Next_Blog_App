'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
//extensions
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import 'react-quill/dist/quill.bubble.css';
//styles
import styles from './writePage.module.css';
//utils
import { app } from '@/utils/firebase';
import { slugify } from '@/utils/helpers';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const metadata = {
  contentType: 'image/jpeg',
};

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState('');
  const [title, setTitle] = useState('');
  const [catSlug, setCatSlug] = useState('lifestyle');
  const [hasError, setHasError] = useState({
    error: false,
    message: '',
  });

  const data = [
    { name: 'lifestyle' },
    { name: 'food' },
    { name: 'travel' },
    { name: 'coding' },
  ];

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

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      if (!file) return;
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          console.warn(error.code);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setMedia(downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [file]);

  const handleSubmit = async () => {
    if (!title || !value) {
      setHasError({
        error: true,
        message: 'Wypełnij wszystkie pola',
      });
      return;
    }
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    } else {
      setHasError({
        error: true,
        message: res.statusText,
      });
    }
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Ładowanie...</div>;
  }

  return (
    <div className={styles.container}>
      <input
        type='text'
        required
        className={styles.input}
        placeholder='Tytuł'
        onChange={e => setTitle(e.target.value)}
        onFocus={() => setHasError({ error: false, message: '' })}
      />
      <select
        className={styles.select}
        onChange={e => setCatSlug(e.target.value)}
      >
        {data.map(category => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      {hasError.error && <p className='error'>{hasError.message}</p>}
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
                <Image
                  className={styles.icon}
                  src={'/image.png'}
                  alt=''
                  width={16}
                  height={16}
                />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image
                className={styles.icon}
                src={'/external.png'}
                alt=''
                width={16}
                height={16}
              />
            </button>
            <button className={styles.addButton}>
              <Image
                className={styles.icon}
                src={'/video.png'}
                alt=''
                width={16}
                height={16}
              />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme='bubble'
          value={value}
          onChange={setValue}
          placeholder='Napisz swoja historię..'
          onFocus={() => setHasError({ error: false, message: '' })}
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publikuj
      </button>
    </div>
  );
};

export default WritePage;
