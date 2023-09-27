import React from 'react';

//components
import MenuPosts from '@/components/menuPosts/MenuPosts';
import MenuCategories from '@/components/menuCategories/MenuCategories';
import MenuPopular from '@/components/menuPopular/menuPopular';
//styles
import styles from './menu.module.css';

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>Co nowego</h2>
      <h1 className={styles.title}>Najpopularniejsze</h1>
      <MenuPosts />

      <h2 className={styles.subtitle}>Zobacz tematy</h2>
      <h1 className={styles.title}>Kategorie</h1>
      <MenuCategories />

      <h2 className={styles.subtitle}>Wybrane przez użytkowników</h2>
      <h1 className={styles.title}>Najbardziej Polubione</h1>
      <MenuPopular />
    </div>
  );
};

export default Menu;
