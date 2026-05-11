import { notFound } from "next/navigation";
import { Shell } from "@/components/shell/shell";
import { getArticleSlugs, getArticles } from "@/lib/client";
import { normalizeArticleText, slugifyArticleTitle } from "@/lib/formatters";
import styles from "./page.module.scss";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  // Bygger alle kendte slugs ved build-tid til statiske artikelsider.
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Læser slug-parameteren fra URL'en.
  const { slug } = await params;
  // Henter artikler og finder den der matcher den aktuelle slug.
  const articles = await getArticles();
  const article = articles.find((item) => slugifyArticleTitle(item.overskrift) === slug);

  if (!article) {
    // Viser Next.js 404-side hvis slug ikke findes.
    notFound();
  }

  // Renser tekst og opdeler indholdet i afsnit til rendering.
  const paragraphs = normalizeArticleText(article.indhold.text)
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <Shell>
      <article className={styles.article}>
        <div className={styles.heroImageWrap}>
          <img className={styles.heroImage} src={article.billede.url} alt={article.overskrift} />
        </div>

        <div className={styles.metaBlock}>
          <p className={styles.category}>{article.kategori}</p>
          <h1>{article.overskrift}</h1>
          <p className={styles.meta}>
            D. {article.dato} - af {article.skribent}
          </p>
        </div>

        <div className={styles.content}>
          {paragraphs.map((paragraph, index) => (
            <p key={`${slug}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>
    </Shell>
  );
}