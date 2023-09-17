import React from 'react';
import styles from './menu.module.css';
import MenuPosts from '../menuPosts/MenuPosts';
import MenuCategories from '../menuCategories/MenuCategories';
import MenuPopular from '../menuPopular/menuPopular';

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
