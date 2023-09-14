'use client';
import Link from 'next/link';
import styles from './comments.module.css';
import Image from 'next/image';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { API_URL } from '@/utils/contants';
import { IComment } from '@/utils/api';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

const Comments = ({ postSlug }: { postSlug: string }) => {
  const { status } = useSession();
  const { data, isLoading }: { data: IComment[]; isLoading: boolean } = useSWR(
    `${API_URL}/comments?postSlug=${postSlug}`,
    fetcher
  );
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Komentarze</h1>
      {status === 'authenticated' ? (
        <div className={styles.write}>
          <textarea
            placeholder='napisz komentarz...'
            className={styles.input}
          />
          <button className={styles.button}>Dodaj</button>
        </div>
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
                    <span className={styles.username}>{comment.user.name}</span>
                    <span className={styles.date}>
                      {comment.createdAt.substring(0, 10)}{' '}
                      {comment.createdAt.substring(11, 20)}
                    </span>
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
