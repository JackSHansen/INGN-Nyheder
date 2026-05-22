import { articlesQuery } from "./queries";
import { Article, HygraphResponse } from "./types";
import { slugifyArticleTitle } from "./formatters";

// Endpoint læses fra miljøvariabel, så URL ikke hardcodes i koden.
const endpoint = process.env.HYGRAPH_ENDPOINT;

function requireEndpoint() {
  // Fejler tidligt med en tydelig fejl, hvis endpoint mangler.
  if (!endpoint) {
    throw new Error("Missing HYGRAPH_ENDPOINT in environment variables.");
  }

  return endpoint;
}

export async function fetchFromHygraph<T>(query: string) {
  // Udfører GraphQL POST-request mod Hygraph med ISR revalidering.
  const response = await fetch(requireEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Hygraph request failed with status ${response.status}`);
  }

  // Sikrer at vi kun returnerer gyldig data-del af responsen.
  const payload = (await response.json()) as { data?: T; errors?: unknown };

  if (!payload.data) {
    throw new Error("Hygraph response did not contain data.");
  }

  return payload.data;
}

export async function getArticles() {
  // Henter artikler med den fælles query.
  const data = await fetchFromHygraph<HygraphResponse>(articlesQuery);
  return data.articles;
}

export async function getArticleCategories() {
  // Finder de kategorier, der faktisk findes i artiklerne fra API'et.
  const articles = await getArticles();
  return Array.from(new Set(articles.map((article) => article.kategori).filter(Boolean)));
}

export function filterArticlesByCategory(articles: Article[], category: string) {
  // Samler den filtrering, som både forsiden og kategorisiderne bruger.
  if (category === "Alle") {
    return articles;
  }

  return articles.filter((article) => article.kategori === category);
}

export async function getArticleSlugs() {
  // Afleder URL-venlige slugs fra artikeloverskrifter.
  const articles = await getArticles();
  return articles.map((article) => slugifyArticleTitle(article.overskrift));
}
