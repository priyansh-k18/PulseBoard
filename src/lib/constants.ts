import type { ContentCategory } from "@/types/content";

export const ALL_CATEGORIES: ContentCategory[] = [
  "technology",
  "sports",
  "finance",
  "entertainment",
  "health",
  "science",
];

export const CATEGORY_LABELS: Record<ContentCategory, string> = {
  technology: "Technology",
  sports: "Sports",
  finance: "Finance",
  entertainment: "Entertainment",
  health: "Health",
  science: "Science",
};

export const DEFAULT_CATEGORIES: ContentCategory[] = [
  "technology",
  "entertainment",
  "sports",
];

export const PAGE_SIZE = 9;

/** NewsAPI category mapping for preference categories */
export const NEWS_API_CATEGORY_MAP: Record<ContentCategory, string> = {
  technology: "technology",
  sports: "sports",
  finance: "business",
  entertainment: "entertainment",
  health: "health",
  science: "science",
};

/** TMDB genre IDs used for recommendations */
export const TMDB_GENRE_MAP: Record<ContentCategory, number> = {
  technology: 878, // Science Fiction
  sports: 28, // Action
  finance: 99, // Documentary
  entertainment: 35, // Comedy
  health: 18, // Drama
  science: 878, // Science Fiction
};
