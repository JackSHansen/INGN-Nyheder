export function slugifyArticleTitle(title: string) {
  // Konverterer titel til en stabil, URL-venlig slug.
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatArticleDate(value: string) {
  // Prøver at parse dato; bruger original værdi hvis parsing fejler.
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function normalizeArticleText(text: string) {
  // Normaliserer både escaped og faktiske linjeskift til samme format.
  const normalizedNewlines = text
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");

  // Opdeler tekst i rensede afsnit uden tomme linjer.
  const paragraphs = normalizedNewlines
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return "";
  }

  // Fjerner en evt. ledende label som kun hedder "Indhold:".
  const [firstParagraph, ...rest] = paragraphs;

  if (/^indhold\s*:?$/i.test(firstParagraph) && rest.length > 0) {
    return rest.join("\n");
  }

  return paragraphs.join("\n");
}

export function getExcerpt(text: string) {
  // Bruger første afsnit som kort uddrag til artikelkort.
  const firstParagraph = normalizeArticleText(text)
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .find(Boolean);

  if (!firstParagraph) {
    return "";
  }

  if (firstParagraph.length <= 160) {
    return firstParagraph;
  }

  // Afkorter lange uddrag uden at klippe med vilde mellemrum i enden.
  return `${firstParagraph.slice(0, 157).trimEnd()}...`;
}
