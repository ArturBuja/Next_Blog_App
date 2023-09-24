import Menu from '@/components/menu/Menu';
import styles from './singlePage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import { API_URL_TEST } from '@/utils/contants';
import { IPost } from '@/utils/api';
import Like from '@/components/organism/Like';
import prisma from '@/utils/conenct';

const getData = async (slug: string): Promise<IPost | null> => {
  const res = await fetch(`${API_URL_TEST}/posts/${slug}`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

const checkIfUserLikedPost = async (userEmail: string, postSlug: string) => {
  const like = await prisma.like.findFirst({
    where: {
      postSlug,
      userEmail,
      liked: true,
    },
  });

  return like !== null; // If 'like' is not null, the user liked the post; otherwise, they didn't.
};
const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await getData(slug);
  const isLiked = await checkIfUserLikedPost(
    data?.user?.email ?? '',
    data?.slug ?? ''
  );

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  alt='avatar'
                  src={data?.user?.image}
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>
                {data?.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image
              alt={data?.img}
              src={data?.img}
              fill
              className={styles.image}
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc || '' }}
          />
          <div>
            <Like
              postSlug={data?.slug ?? ''}
              likes={data?.likes ?? 0}
              isLiked={isLiked}
              userEmail={data?.user?.email ?? ''}
            />
          </div>
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
