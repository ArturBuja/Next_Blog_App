import React from 'react';
import styles from './menu.module.css';
import Link from 'next/link';
import Image from 'next/image';
import MenuPosts from '../menuPosts/MenuPosts';
import MenuCategories from '../menuCategories/MenuCategories';

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>Co nowego</h2>
      <h1 className={styles.title}>Najpopularniejsze</h1>
      <MenuPosts withImage={false} />
      {/* //// */}
      <h2 className={styles.subtitle}>Zobacz tematy</h2>
      <h1 className={styles.title}>Kategorie</h1>
      <MenuCategories />
      {/* //////////// */}
      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Picks</h1>
      <MenuPosts withImage={true} />
    </div>
  );
};

export default Menu;
