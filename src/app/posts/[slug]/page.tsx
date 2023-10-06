import Image from 'next/image';

//components
import Menu from '@/components/menu/Menu';
import Like from '@/components/organism/Like';
import Comments from '@/components/comments/Comments';
//styles
import styles from './singlePage.module.css';
//utils
import { API_URL_TEST } from '@/utils/contants';
import { getAuthSession } from '@/utils/auth';
import { IPost } from '@/utils/api';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const res: IPost | null = await fetch(
    `${API_URL_TEST}/posts/${params.slug}`,
    {
      cache: 'no-cache',
    }
  ).then(res => res.json());

  if (!res) {
    throw new Error('Post not found');
  }

  return {
    title: res.title ?? 'Post | From Lines To Life',
    description: res.desc,
    authors: [
      {
        name: 'Artur Buja',
      },
    ],
  };
}

const getData = async (slug: string): Promise<IPost | null> => {
  const res = await fetch(`${API_URL_TEST}/posts/${slug}`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const session = await getAuthSession();

  const { slug } = params;
  const data = await getData(slug);

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
              postSlug={slug ?? null}
              userEmail={session?.user?.email ?? null}
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
