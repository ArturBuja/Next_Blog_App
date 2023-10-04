'use client';
import { useState } from 'react';

import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

// Components
import ThreeDots from '@/components/organism/threeDots/ThreeDots';
// Utils
import { API_URL_TEST } from '@/utils/contants';
import { IComment } from '@/utils/api';
// Styles
import styles from './comments.module.css';

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
  const [editMode, setEditMode] = useState(false);
  const [desc, setDesc] = useState('');
  const [modyfiedId, setModyfiedId] = useState('');
  const [hasError, setHasError] = useState({
    error: false,
    message: '',
  });
  const handleSubmit = async () => {
    try {
      if (!desc.trim()) {
        throw new Error('Pole komentarza nie może być puste');
      }
      if (editMode) {
        await fetch(`/api/comments`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: modyfiedId, desc }),
        });
        setEditMode(false);
      } else {
        await fetch(`/api/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ desc, postSlug }),
        });
      }
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
              {editMode ? 'Zapisz' : 'Dodaj'}
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
                      {comment.modified && comment.modifiedAt && (
                        <span className={styles.modificatedDate}>
                          Komentarz edytowany dnia:{' '}
                          {new Date(comment.modifiedAt).toLocaleString()}
                        </span>
                      )}
                    </div>

                    {comment.user.email === user?.user?.email && (
                      <ThreeDots
                        setEditMode={setEditMode}
                        setModyfiedId={setModyfiedId}
                        setDesc={setDesc}
                        mutate={mutate}
                        commentId={comment.id}
                      />
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
