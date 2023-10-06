//components
import CardList from '@/components/cardList/CardList';
import Menu from '@/components/menu/Menu';
//styles
import styles from './blogPage.module.css';
import { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { cat: string };
}): Promise<Metadata> {
  return {
    title: `Kat. ${searchParams.cat} | From Lines To Life`,
  };
}

const BlogPage = ({
  searchParams,
}: {
  searchParams: { page: string | undefined; cat: string };
}) => {
  const page = parseInt(searchParams?.page ?? '1');
  const { cat } = searchParams;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>kategoria: {cat}</h1>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
