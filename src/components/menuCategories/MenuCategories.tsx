import Link from 'next/link';
import React from 'react';
import styles from './menuCategories.module.css';
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
const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      {categoryMap.map(category => (
        <Link
          href={'/blog?cat=' + category.name}
          key={category.name}
          className={`${styles.categoryItem} ${styles[category.name]}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
