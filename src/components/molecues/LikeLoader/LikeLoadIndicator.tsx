import styles from './likeLoaderIndicator.module.css';

export default function LikeLoadIndicator() {
  return (
    <div className={styles.spinnerSquare}>
      <div className={`${styles.square1} ${styles.square}`}></div>
      <div className={`${styles.square2} ${styles.square}`}></div>
      <div className={`${styles.square3} ${styles.square}`}></div>
    </div>
  );
}
