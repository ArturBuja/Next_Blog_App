import CardList from '@/components/cardList/CardList';
import styles from './blogPage.module.css';
import Menu from '@/components/menu/Menu';

const BlogPage = ({
  searchParams,
}: {
  searchParams: { page: string | undefined; cat: string };
}) => {
  const page = parseInt(searchParams?.page ?? '1');
  const { cat } = searchParams;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat} blog</h1>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
