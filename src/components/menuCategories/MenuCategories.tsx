import Link from 'next/link';
import React from 'react';
import styles from './menuCategories.module.css';
import { getAllCategories } from '@/app/api';

const MenuCategories = async () => {
  const data = await getAllCategories();
  return (
    <div className={styles.categoryList}>
      {data.map(category => (
        <Link
          href={'/blog?cat=' + category.slug}
          key={category.slug}
          className={`${styles.categoryItem} ${styles[category.slug]}`}
        >
          {category.slug}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
