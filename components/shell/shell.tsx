import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import styles from "./shell.module.scss";

type ShellProps = {
  children: React.ReactNode;
  categories: string[];
  activeCategory?: string;
};

export function Shell({ children, categories, activeCategory }: ShellProps) {
  // Samler sidens faste ramme: header, indholdsområde og footer.
  return (
    <div className={styles.shell}>
      <Header categories={categories} activeCategory={activeCategory} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}