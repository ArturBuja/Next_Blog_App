import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

//utils
import { IPage } from '@/utils/api';
import { API_URL_TEST } from '@/utils/contants';
//styles
import styles from './menuPosts.module.css';

const getData = async (): Promise<IPage[]> => {
  const res = await fetch(`${API_URL_TEST}/posts?popular=true`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

const MenuPosts = async () => {
  const posts = await getData();

  if (posts.length === 0) {
    return (
      <div className={styles.items}>
        <p>Brak najpopularniejszych postów</p>
      </div>
    );
  }
  return (
    <div className={styles.items}>
      {posts.map((post: IPage) => (
        <Link
          href={`/posts/${post.slug}`}
          className={styles.item}
          key={post.id}
        >
          {post.img && (
            <div className={styles.imageContainer}>
              <Image
                src={post.img}
                alt='Miniaturka postu'
                fill
                className={styles.image}
              />
            </div>
          )}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles[post.catSlug]}`}>
              {post.catSlug}
            </span>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <div className={styles.detail}>
              <span className={styles.username}>Artur Buja</span>
              <span className={styles.date}>
                - {post.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
