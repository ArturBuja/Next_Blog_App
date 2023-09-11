import Menu from '@/components/menu/Menu';
import styles from './singlePage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
const SinglePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image alt='' src={'/p1.jpeg'} fill className={styles.avatar} />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>Artur Buja</span>
              <span className={styles.date}>11.10.2022</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image alt='' src={'/p1.jpeg'} fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              nemo! Nam molestiae alias incidunt quasi voluptatum error. Magnam
              adipisci sapiente vel. Voluptatum nemo perferendis ipsum ea rerum
              atque quae aliquid! Sint rem ipsa vel molestias magni at. Unde,
              nemo nobis?
            </p>
            <h2>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              nemo! Nam molestiae alias incidunt quasi voluptatum error. Magnam
              adipisci sapiente vel. Voluptatum nemo perferendis ipsum ea rerum
              atque quae aliquid! Sint rem ipsa vel molestias magni at. Unde,
              nemo nobis?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              nemo! Nam molestiae alias incidunt quasi voluptatum error. Magnam
              adipisci sapiente vel. Voluptatum nemo perferendis ipsum ea rerum
              atque quae aliquid! Sint rem ipsa vel molestias magni at. Unde,
              nemo nobis?
            </p>
          </div>
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
