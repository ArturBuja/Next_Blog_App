'use client';
import React, { useState, useEffect } from 'react';
import styles from './pagination.module.css';
import { useRouter } from 'next/navigation';

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
