import Image from 'next/image';
import styles from './card.module.css';
import Link from 'next/link';
import { IPage } from '@/utils/api';

const Card = ({ key, post }: { key: string; post: IPage }) => {
  return (
    <div className={styles.container} key={key}>
      {post.img ? (
        <div className={styles.imageContainer}>
          <Image src={post.img} alt={post.img} fill className={styles.image} />
        </div>
      ) : null}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {post.createdAt.substring(0, 10)} -
          </span>
          <span className={styles.category}>{post.catSlug}</span>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
        <p className={styles.postDesc}>{post.desc.substring(0, 60)}</p>
        <Link href={`/posts/${post.slug}`} className={styles.link}>
          Zobacz więcej
        </Link>
      </div>
    </div>
  );
};

export default Card;
