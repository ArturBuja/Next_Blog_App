import React from 'react';
import styles from './categoryList.module.css';
import Link from 'next/link';
import Image from 'next/image';

const categoryMap = [
  {
    name: 'style',
    image: '/style.png',
  },
  {
    name: 'fashion',
    image: '/fashion.png',
  },
  { name: 'food', image: '/food.png' },
  {
    name: 'travel',
    image: '/travel.png',
  },
  { name: 'culture', image: '/culture.png' },
  { name: 'coding', image: '/coding.png' },
];
const CategoryList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popularne kategorie</h1>
      <div className={styles.categories}>
        {categoryMap.map(category => (
          <Link
            href={'/blog?cat=' + category.name}
            key={category.name}
            className={`${styles.category} ${styles[category.name]}`}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={32}
              height={32}
              className={styles.image}
            />
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
