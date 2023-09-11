import Link from 'next/link';
import styles from './comments.module.css';
import Image from 'next/image';

const Comments = () => {
  const status = 'authenticated';
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Komentarze</h1>
      {status === 'authenticated' ? (
        <div className={styles.write}>
          <textarea
            placeholder='napisz komentarz...'
            className={styles.input}
          />
          <button className={styles.button}>Dodaj</button>
        </div>
      ) : (
        <Link href='/login'>Zaloguj się aby dodawać komentarze</Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              alt=''
              src={'/p1.jpeg'}
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>Artur Buja</span>
              <span className={styles.date}>11.10.2022</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi quo
            eos explicabo reprehenderit obcaecati, suscipit voluptatem
            consectetur ab quibusdam omnis architecto nisi ullam enim veniam
            recusandae neque autem impedit repellat!
          </p>
        </div>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              alt=''
              src={'/p1.jpeg'}
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>Artur Buja</span>
              <span className={styles.date}>11.10.2022</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi quo
            eos explicabo reprehenderit obcaecati, suscipit voluptatem
            consectetur ab quibusdam omnis architecto nisi ullam enim veniam
            recusandae neque autem impedit repellat!
          </p>
        </div>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              alt=''
              src={'/p1.jpeg'}
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>Artur Buja</span>
              <span className={styles.date}>11.10.2022</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi quo
            eos explicabo reprehenderit obcaecati, suscipit voluptatem
            consectetur ab quibusdam omnis architecto nisi ullam enim veniam
            recusandae neque autem impedit repellat!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
