import Menu from '@/components/menu/Menu';
import styles from './singlePage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';

const WelcomePost = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Lorem, ipsum.</h1>
          <div className={styles.user}>
            {/* {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  alt='avatar'
                  src={data?.user?.image}
                  fill
                  className={styles.avatar}
                />
              </div>
            )} */}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>Artur Buja</span>
              <span className={styles.date}>18.09.2023</span>
            </div>
          </div>
        </div>
        {/* {data?.img && (
          <div className={styles.imageContainer}>
            <Image
              alt={data?.img}
              src={data?.img}
              fill
              className={styles.image}
            />
          </div>
        )} */}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc || '' }}
          />

          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default WelcomePost;
