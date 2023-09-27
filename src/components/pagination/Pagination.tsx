'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

// Styles
import styles from './pagination.module.css';

const Pagination = ({
  page,
  hasPrevious,
  hasNext,
}: {
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
}) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrevious}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Poprzednia
      </button>

      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Następna
      </button>
    </div>
  );
};

export default Pagination;
