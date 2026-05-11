import Link from "next/link";
import { Article } from "@/lib/types";
import { slugifyArticleTitle, formatArticleDate, getExcerpt } from "@/lib/formatters";
import styles from "./article-card.module.scss";

type ArticleCardProps = {
  article: Article;
  index: number;
};

export function ArticleCard({ article, index }: ArticleCardProps) {
  // Afleder alt visningsdata til kortet fra API-artiklen.
  const slug = slugifyArticleTitle(article.overskrift);
  const excerpt = getExcerpt(article.indhold.text);
  const href = `/artikler/${slug}`;

  return (
    <article className={styles.card} data-index={index} data-featured={index === 0}>
      <div className={styles.textBlock}>
        <h2 className={styles.title}>{article.overskrift}</h2>
        <p className={styles.meta}>
          D. {formatArticleDate(article.dato)} - af {article.skribent}
        </p>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
        <Link className={styles.readMore} href={href}>
          Læs mere
        </Link>
      </div>

      <Link href={href} className={styles.imageLink} aria-label={`Læs ${article.overskrift}`}>
        {article.billede.url ? (
          <img className={styles.image} src={article.billede.url} alt={article.overskrift} />
        ) : (
          <div className={styles.placeholder} />
        )}
      </Link>
    </article>
  );
}