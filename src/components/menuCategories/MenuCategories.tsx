import React from 'react';

import Link from 'next/link';

//api
import { getAllCategories } from '@/app/api';
//styles
import styles from './menuCategories.module.css';

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
