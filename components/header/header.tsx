import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { CategoryNav } from "@/components/category-nav/category-nav";
import styles from "./header.module.scss";

type HeaderProps = {
  activeCategory?: string;
};

export function Header({ activeCategory = "Alle" }: HeaderProps) {
  // Viser brand, kategorinavigation og to handlingsknapper i topbaren.
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Gå til forsiden">
          INGN
        </Link>
        <CategoryNav activeCategory={activeCategory} />
        <button className={styles.iconButton} type="button" aria-label="Brugerprofil">
          <FontAwesomeIcon icon={faUser} />
        </button>
        <button className={styles.iconButton} type="button" aria-label="Menu">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </header>
  );
}