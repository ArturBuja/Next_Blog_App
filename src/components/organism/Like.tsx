'use client';
import Image from 'next/image';
import styles from './likeIcon.module.css';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import prisma from '@/utils/conenct';

interface IProps {
  isLiked: boolean;
  likes: number;
  postSlug: string;
  userEmail: string;
}

const Like = ({ isLiked, likes, postSlug, userEmail }: IProps) => {
  const { theme } = useContext(ThemeContext);

  const handleLikeClick = async () => {
    console.log('object', postSlug);
    const res = await fetch('/api/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postSlug, userEmail }),
    });
    console.log(res);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.counter}>{likes}</div>
        <div className={styles.icon} onClick={handleLikeClick}>
          <Image
            src={
              isLiked
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
    </div>
  );
};

export default Like;
