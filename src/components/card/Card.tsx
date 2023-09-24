import Image from 'next/image';
import styles from './card.module.css';
import Link from 'next/link';
import { IPage } from '@/utils/api';

const Card = ({ post }: { post: IPage }) => {
  return (
    <div className={styles.container}>
      {post.img ? (
        <div className={styles.imageContainer}>
          <Image src={post.img} alt={post.img} fill className={styles.image} />
        </div>
      ) : null}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {post.createdAt.substring(0, 10)} -{' '}
          </span>
          <span className={styles.category}>{post.catSlug}</span>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: `${post?.desc.substring(0, 246)}&hellip;`,
          }}
        />
        <Link href={`/posts/${post.slug}`} className={styles.link}>
          Zobacz więcej
        </Link>
      </div>
    </div>
  );
};

export default Card;
