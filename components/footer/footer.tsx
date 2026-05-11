import styles from "./footer.module.scss";

// Data-kilde til footerens fire kolonner.
const footerSections = [
  {
    title: "Adresse:",
    lines: ["Intet nyt - Godt nyt ApS", "Tulipanvej 232", "7320", "Valby Øster"],
  },
  {
    title: "Links",
    lines: ["vikanweb.dk", "overpådenandenside.dk", "retsinformation.dk", "nogetmednews.dk"],
  },
  {
    title: "Politik",
    lines: ["Privatlivspolitik", "Cookiepolitik", "Købsinformation", "Delingspolitik"],
  },
  {
    title: "Kontakt",
    lines: ["ingn@nyhed.dk", "telefon: 23232323", "fax: 123123-333"],
  },
] as const;

export function Footer() {
  // Renderer hver sektion ensartet via map i stedet for duplikeret markup.
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {footerSections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </section>
        ))}
      </div>
    </footer>
  );
}