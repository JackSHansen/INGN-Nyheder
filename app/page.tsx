import { Shell } from "@/components/shell/shell";
import { ArticleGrid } from "@/components/article-grid/article-grid";
import { getArticles } from "@/lib/client";
import styles from "./page.module.scss";

type HomePageProps = {
  searchParams?: {
    kategori?: string;
  };
};

export default async function Home({ searchParams }: HomePageProps) {
  // Finder aktiv kategori fra URL'en (fallback til "Alle").
  const activeCategory = searchParams?.kategori ?? "Alle";
  // Henter alle artikler fra Hygraph.
  const articles = await getArticles();
  // Filtrerer kun, hvis brugeren har valgt en specifik kategori.
  const filteredArticles =
    activeCategory === "Alle"
      ? articles
      : articles.filter((article) => article.kategori === activeCategory);

  return (
    <Shell activeCategory={activeCategory}>
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
