'use client';
import Link from 'next/link';
import styles from './comments.module.css';
import Image from 'next/image';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { API_URL_TEST } from '@/utils/contants';
import { IComment } from '@/utils/api';
import { useState } from 'react';
import ThreeDots from '../organism/threeDots/ThreeDots';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

const Comments = ({ postSlug }: { postSlug: string }) => {
  const { status, data: user } = useSession();
  const {
    data,
    mutate,
    isLoading,
  }: { data: IComment[]; isLoading: boolean; mutate: () => void } = useSWR(
    `${API_URL_TEST}/comments?postSlug=${postSlug}`,
    fetcher
  );
  const [desc, setDesc] = useState('');
  const [hasError, setHasError] = useState({
    error: false,
    message: '',
  });
  const handleSubmit = async () => {
    try {
      if (!desc.trim()) {
        throw new Error('Pole komentarza nie może być puste');
      }
      await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desc, postSlug }),
      });
      mutate();
      setDesc('');
    } catch (error) {
      setHasError({
        error: true,
        message: (error as Error).message ?? 'Wystąpił błąd, spróbuj ponownie',
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Komentarze</h1>
      {status === 'authenticated' ? (
        <>
          <div className={styles.write}>
            <textarea
              placeholder='Napisz komentarz...'
              className={styles.input}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              onFocus={() => setHasError({ error: false, message: '' })}
            />
            <button className={styles.button} onClick={handleSubmit}>
              Dodaj
            </button>
          </div>
          {hasError.error && <div className='error'>{hasError.message}</div>}
        </>
      ) : (
        <Link href='/login'>Zaloguj się aby dodawać komentarze</Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? 'Ładowanie'
          : data?.map(comment => (
              <div className={styles.comment} key={comment.id}>
                <div className={styles.user}>
                  {comment?.user?.image && (
                    <Image
                      alt='avatar'
                      src={comment.user.image}
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                      <span className={styles.username}>
                        {comment.user.name}
                      </span>
                      <span className={styles.date}>
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {comment.user.email === user?.user?.email && (
                      <ThreeDots mutate={mutate} commentId={comment.id} />
                    )}
                  </div>
                </div>
                <p className={styles.desc}>{comment.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
