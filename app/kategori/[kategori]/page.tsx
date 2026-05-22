import { Shell } from "@/components/shell/shell";
import { ArticleGrid } from "@/components/article-grid/article-grid";
import { filterArticlesByCategory, getArticleCategories, getArticles } from "@/lib/client";
import styles from "../../page.module.scss";

type CategoryPageProps = {
  params: Promise<{
    kategori: string;
  }>;
};

export async function generateStaticParams() {
  const categories = await getArticleCategories();
  return categories.map((kategori) => ({ kategori }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { kategori } = await params;
  const articles = await getArticles();
  const categories = await getArticleCategories();
  const filteredArticles = filterArticlesByCategory(articles, kategori);

  return (
    <Shell categories={categories} activeCategory={kategori}>
      {filteredArticles.length > 0 ? (
        <ArticleGrid articles={filteredArticles} />
      ) : (
        <section className={styles.emptyState}>
          <h2>Ingen artikler i denne kategori</h2>
          <p>Prøv en anden kategori i navigationen.</p>
        </section>
      )}
    </Shell>
  );
}