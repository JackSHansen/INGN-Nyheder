// Samlet query til forsiden og artikelsider med de felter UI'et bruger.
export const articlesQuery = `
  query Articles {
    articles {
      id
      overskrift
      dato
      skribent
      indhold {
        text
      }
      kategori
      billede {
        url
      }
    }
  }
`;
