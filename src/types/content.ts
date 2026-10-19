export type ContentType = "news" | "recommendation" | "social";

export type ContentCategory =
  | "technology"
  | "sports"
  | "finance"
  | "entertainment"
  | "health"
  | "science";

export type DashboardSection = "feed" | "trending" | "favorites" | "settings";

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  category: ContentCategory | string;
  url: string;
  publishedAt: string;
  ctaLabel: string;
  meta?: Record<string, string | number>;
}

export interface ContentResponse {
  items: ContentItem[];
  page: number;
  hasMore: boolean;
  source: "live" | "mock";
}

export interface UserPreferences {
  categories: ContentCategory[];
  displayName: string;
}
