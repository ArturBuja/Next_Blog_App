'use client';
import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useSWR from 'swr';

//stlyes
import styles from './likeIcon.module.css';
//context
import { ThemeContext } from '@/context/ThemeContext';
//utils
import { API_URL_TEST } from '@/utils/contants';

interface IProps {
  postSlug: string | null;
  userEmail: string | null;
}
interface IResponse {
  isLiked: boolean;
  likes: {
    createdAt: string;
    id: string;
    liked: boolean;
    postSlug: string;
    userEmail: string;
  }[];
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

const Like = ({ postSlug, userEmail }: IProps) => {
  const { theme } = useContext(ThemeContext);
  const { status } = useSession();

  const {
    data,
    mutate,
    isLoading,
  }: {
    data: {
      isLiked: boolean;
      likes: IResponse[];
    };
    isLoading: boolean;
    mutate: () => void;
  } = useSWR(
    `${API_URL_TEST}/likes?postSlug=${postSlug}&userEmail=${userEmail}`,
    fetcher
  );

  const handleLikeClick = async () => {
    if (status !== 'authenticated')
      return alert('Musisz być zalogowany, aby polubić post');
    try {
      await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postSlug, userEmail }),
      });
      mutate();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>Ładowanie...</div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.counter}>{data.likes.length}</div>
          <div className={styles.icon} onClick={handleLikeClick}>
            <Image
              src={
                data?.isLiked
                  ? '/like.png'
                  : theme === 'light'
                  ? '/like-outline.png'
                  : '/like-outline-white.png'
              }
              alt='like'
              width={28}
              height={28}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Like;
