// Faste kategorier som bruges i navigation og filtrering.
export const articleCategories = ["Alle", "Indland", "Udland", "Teknologi", "Sport", "Politik", "Samfund"] as const;

// Basistype for en artikel som returneres fra Hygraph.
export type Article = {
  id: string;
  overskrift: string;
  dato: string;
  skribent: string;
  indhold: {
    text: string;
  };
  kategori: string;
  billede: {
    url: string;
  };
};

// Wrapper-type der matcher GraphQL-responsens data-struktur.
export type HygraphResponse = {
  articles: Article[];
};
