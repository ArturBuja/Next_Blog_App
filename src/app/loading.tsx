import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.spinnerSquare}>
      <div className={`${styles.square1} ${styles.square}`}></div>
      <div className={`${styles.square2} ${styles.square}`}></div>
      <div className={`${styles.square3} ${styles.square}`}></div>
    </div>
  );
}
