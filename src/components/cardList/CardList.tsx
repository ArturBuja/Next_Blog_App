import React from 'react';
import styles from './cardList.module.css';
import Pagination from '../pagination/Pagination';
import { API_URL_TEST, POST_PER_PAGE } from '@/utils/contants';
import Card from '../card/Card';
import { IPage } from '@/utils/api';

const getData = async (
  page: number,
  cat?: string
): Promise<{ posts: IPage[]; count: number }> => {
  const res = await fetch(
    `${API_URL_TEST}/posts?page=${page}&cat=${cat || ''}`,
    {
      cache: 'no-cache',
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

const CardList = async ({ page, cat }: { page: number; cat?: string }) => {
  const { posts, count } = await getData(page, cat);

  const hasPrevious = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ostatnie posty</h1>
      <div className={styles.posts}>
        {posts.length > 0 ? (
          posts?.map(post => <Card key={post.id} post={post} />)
        ) : (
          <p style={{ textAlign: 'center' }}>Aktualnie brak postów</p>
        )}
      </div>
      {posts.length > 0 && (
        <Pagination page={page} hasPrevious={hasPrevious} hasNext={hasNext} />
      )}
    </div>
  );
};

export default CardList;
