import { ArticleCard } from "@/components/article-card/article-card";
import { Article } from "@/lib/types";
import styles from "./article-grid.module.scss";

type ArticleGridProps = {
  articles: Article[];
};

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <section className={styles.grid} aria-label="Artikler">
      {/* Sender index med til kortet, så CSS-grid kan placere hvert kort forskelligt. */}
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </section>
  );
}