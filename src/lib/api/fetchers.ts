import {
  NEWS_API_CATEGORY_MAP,
  PAGE_SIZE,
  TMDB_GENRE_MAP,
} from "@/lib/constants";
import { getMockFeed, getMockTrending } from "@/lib/mock-data";
import type {
  ContentCategory,
  ContentItem,
  ContentResponse,
} from "@/types/content";

function parseCategories(raw: string | null): ContentCategory[] {
  if (!raw) return ["technology", "entertainment", "sports"];
  return raw
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean) as ContentCategory[];
}

async function fetchNews(
  categories: ContentCategory[],
  page: number,
): Promise<ContentItem[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  const category = NEWS_API_CATEGORY_MAP[categories[0] ?? "technology"];
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${PAGE_SIZE}&page=${page}&language=en&apiKey=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];

  const data = (await res.json()) as {
    articles?: Array<{
      title?: string;
      description?: string | null;
      urlToImage?: string | null;
      url?: string;
      source?: { name?: string };
      publishedAt?: string;
    }>;
  };

  return (data.articles ?? [])
    .filter((article) => article.title && article.url)
    .map((article, index) => ({
      id: `news-live-${page}-${index}-${article.url}`,
      type: "news" as const,
      title: article.title!.replace(/ - .*$/, ""),
      description: article.description || "No description available.",
      imageUrl:
        article.urlToImage ||
        `https://picsum.photos/seed/news-${index}/640/360`,
      source: article.source?.name || "NewsAPI",
      category: categories[0] ?? "technology",
      url: article.url!,
      publishedAt: article.publishedAt || new Date().toISOString(),
      ctaLabel: "Read More",
    }));
}

async function fetchRecommendations(
  categories: ContentCategory[],
  page: number,
): Promise<ContentItem[]> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return [];

  const genre = TMDB_GENRE_MAP[categories[0] ?? "entertainment"];
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];

  const data = (await res.json()) as {
    results?: Array<{
      id: number;
      title?: string;
      overview?: string;
      poster_path?: string | null;
      backdrop_path?: string | null;
      vote_average?: number;
      release_date?: string;
    }>;
  };

  return (data.results ?? []).map((movie) => ({
    id: `rec-live-${movie.id}`,
    type: "recommendation" as const,
    title: movie.title || "Untitled",
    description: movie.overview || "No overview available.",
    imageUrl: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
      : movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : `https://picsum.photos/seed/movie-${movie.id}/640/360`,
    source: "TMDB",
    category: categories[0] ?? "entertainment",
    url: `https://www.themoviedb.org/movie/${movie.id}`,
    publishedAt: movie.release_date
      ? new Date(movie.release_date).toISOString()
      : new Date().toISOString(),
    ctaLabel: "Play Now",
    meta: { rating: movie.vote_average ?? 0 },
  }));
}

async function fetchSocial(
  categories: ContentCategory[],
  page: number,
): Promise<ContentItem[]> {
  // Mock social feed (Twitter/X APIs require paid access)
  const { items } = getMockFeed(categories, page, PAGE_SIZE);
  return items
    .filter((item) => item.type === "social")
    .map((item) => ({
      ...item,
      id: `social-live-${item.id}`,
    }));
}

export async function getUnifiedContent(params: {
  categories?: string | null;
  page?: string | null;
  query?: string | null;
  mode?: string | null;
}): Promise<ContentResponse> {
  const categories = parseCategories(params.categories ?? null);
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const query = params.query?.trim() ?? "";
  const mode = params.mode ?? "feed";

  if (mode === "trending") {
    const liveNews = await fetchNews(categories, 1);
    const liveRecs = await fetchRecommendations(categories, 1);
    const mixed = [...liveNews, ...liveRecs]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      .slice(0, 6);

    if (mixed.length > 0) {
      return { items: mixed, page: 1, hasMore: false, source: "live" };
    }

    return {
      items: getMockTrending(categories),
      page: 1,
      hasMore: false,
      source: "mock",
    };
  }

  const [news, recommendations, social] = await Promise.all([
    fetchNews(categories, page),
    fetchRecommendations(categories, page),
    fetchSocial(categories, page),
  ]);

  let items = [...news, ...recommendations, ...social].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const usedLive = news.length > 0 || recommendations.length > 0;

  if (!usedLive || items.length === 0) {
    const mock = getMockFeed(categories, page, PAGE_SIZE, query);
    return {
      items: mock.items,
      page,
      hasMore: mock.hasMore,
      source: "mock",
    };
  }

  if (query) {
    const q = query.toLowerCase();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        String(item.category).toLowerCase().includes(q),
    );
  }

  return {
    items,
    page,
    hasMore: items.length >= PAGE_SIZE / 2,
    source: "live",
  };
}
