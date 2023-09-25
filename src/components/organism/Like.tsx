'use client';
import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useSWR, { KeyedMutator } from 'swr';

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
const fetchLikes = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const Like = ({ postSlug, userEmail }: IProps) => {
  const { theme } = useContext(ThemeContext);
  const { status } = useSession();

  const {
    data,
    mutate,
    isValidating,
  }: {
    data: {
      isLiked: boolean;
      likes: IResponse[];
    };
    mutate: KeyedMutator<IResponse>;
    isValidating: boolean;
  } = useSWR(
    `${API_URL_TEST}/likes?postSlug=${postSlug}&userEmail=${userEmail}`,
    fetchLikes
  );

  const handleLikeClick = async () => {
    if (status !== 'authenticated') {
      alert('Musisz być zalogowany, aby polubić post');
      return;
    }
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
      {isValidating ? (
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
