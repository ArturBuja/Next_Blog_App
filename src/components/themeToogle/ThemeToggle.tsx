'use client';
import { useContext, useMemo } from 'react';

import Image from 'next/image';

// Styles
import styles from './themeToggle.module.css';
// Contexts
import { ThemeContext } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { toogle, theme } = useContext(ThemeContext);
  const ballStyle = useMemo(
    () =>
      theme === 'dark'
        ? { left: 4, backgroundColor: '#0f172a' }
        : { right: 4, backgroundColor: '#fff' },
    [theme]
  );
  const backgroundContaienerStyle = useMemo(
    () =>
      theme === 'light'
        ? { backgroundColor: '#0f172a' }
        : { backgroundColor: '#f2f2f2' },
    [theme]
  );

  return (
    <div
      className={styles.container}
      onClick={toogle}
      style={backgroundContaienerStyle}
    >
      <Image src={'/moon.png'} width={14} height={14} alt={'moon icon'} />
      <div className={styles.ball} style={ballStyle}></div>
      <Image src={'/sun.png'} width={14} height={14} alt={'sun icon'} />
    </div>
  );
};

export default ThemeToggle;
