import Link from "next/link";
import { articleCategories } from "@/lib/types";
import styles from "./category-nav.module.scss";

type CategoryNavProps = {
  activeCategory?: string;
};

export function CategoryNav({ activeCategory = "Alle" }: CategoryNavProps) {
  return (
    <nav className={styles.nav} aria-label="Kategorier">
      {articleCategories.map((category) => {
        // "Alle" peger på forsiden, øvrige kategorier sendes som query-param.
        const href = category === "Alle" ? "/" : `/?kategori=${encodeURIComponent(category)}`;
        // Bruges til at markere aktiv kategori visuelt i CSS.
        const isActive = category === activeCategory;

        return (
          <Link key={category} href={href} className={styles.link} data-active={isActive}>
            {category}
          </Link>
        );
      })}
    </nav>
  );
}