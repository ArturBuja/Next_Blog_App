import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

//styles
import styles from './categoryList.module.css';
//utils
import { ICategory } from '@/utils/api';
import { API_URL_TEST } from '@/utils/contants';

const getData = async (): Promise<ICategory[]> => {
  const res = await fetch(`${API_URL_TEST}/categories`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

const CategoryList = async () => {
  const data = await getData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popularne kategorie</h1>
      <div className={styles.categories}>
        {data?.map(category => (
          <Link
            href={'/blog?cat=' + category.slug}
            key={category.id}
            className={`${styles.category} ${styles[category.slug]}`}
          >
            {category.img && (
              <Image
                src={category.img}
                alt={category.slug}
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {category.slug}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
