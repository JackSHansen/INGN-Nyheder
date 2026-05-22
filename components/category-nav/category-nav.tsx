import Link from "next/link";
import styles from "./category-nav.module.scss";

type CategoryNavProps = {
  categories: string[];
  activeCategory?: string;
};

export function CategoryNav({ categories, activeCategory = "Alle" }: CategoryNavProps) {
  return (
    <nav className={styles.nav} aria-label="Kategorier">
      {["Alle", ...categories].map((category) => {
        // "Alle" peger på forsiden, øvrige kategorier får deres egen route.
        const href = category === "Alle" ? "/" : `/kategori/${encodeURIComponent(category)}`;
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