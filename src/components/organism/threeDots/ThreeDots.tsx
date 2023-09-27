'use client';
import { useEffect, useRef, useState } from 'react';

//styles
import styles from './threeDots.module.css';

const ThreeDots = ({
  commentId,
  mutate,
}: {
  commentId: string;
  mutate: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isCliced, setIsClicked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        // Kliknięcie wystąpiło poza przyciskiem, więc zamykamy menu.
        setIsClicked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/comments/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: commentId }),
      });

      if (response.ok) {
        mutate();
      } else {
        throw new Error('Failed to delete comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        onClick={() => setIsClicked(!isCliced)}
        className={`${styles.dots} ${isCliced ? styles.on : ''}`}
      >
        <span></span>
      </button>
      <div className={`${styles.menu} ${isCliced ? styles.showMenu : ''}`}>
        <div className={styles.menuCaret}>
          <div className={styles.menuCaretOuter}></div>
          <div className={styles.menuCaretInner}></div>
        </div>
        <ul
          className={styles.menuItems}
          role='menu'
          aria-labelledby={styles.btn}
          aria-hidden='true'
        >
          <li className={styles.menuItem} role='presentation'>
            <button
              type='button'
              onClick={handleDelete}
              className={styles.menuBtn}
              role='menuitem'
            >
              Usuń
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ThreeDots;
