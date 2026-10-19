import type { ContentCategory, ContentItem } from "@/types/content";

const PLACEHOLDER = (seed: string, w = 640, h = 360) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const baseNews: Omit<ContentItem, "id">[] = [
  {
    type: "news",
    title: "AI chips reshape cloud infrastructure spending",
    description:
      "Enterprises are reallocating budgets toward specialized accelerators as inference workloads scale worldwide.",
    imageUrl: PLACEHOLDER("news-tech-1"),
    source: "Tech Daily",
    category: "technology",
    url: "https://example.com/news/ai-chips",
    publishedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    ctaLabel: "Read More",
  },
  {
    type: "news",
    title: "Championship finals draw record streaming audience",
    description:
      "Sports platforms report peak concurrent viewers as overtime drama keeps fans glued to screens.",
    imageUrl: PLACEHOLDER("news-sports-1"),
    source: "Arena Wire",
    category: "sports",
    url: "https://example.com/news/championship",
    publishedAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    ctaLabel: "Read More",
  },
  {
    type: "news",
    title: "Markets steady as inflation cools for third month",
    description:
      "Investors watch central bank signals while tech and energy sectors trade in a narrow range.",
    imageUrl: PLACEHOLDER("news-finance-1"),
    source: "Ledger Brief",
    category: "finance",
    url: "https://example.com/news/markets",
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    ctaLabel: "Read More",
  },
  {
    type: "news",
    title: "Indie studios dominate weekend box office",
    description:
      "A wave of character-driven releases outperformed franchise sequels in key urban markets.",
    imageUrl: PLACEHOLDER("news-ent-1"),
    source: "Culture Desk",
    category: "entertainment",
    url: "https://example.com/news/box-office",
    publishedAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    ctaLabel: "Read More",
  },
  {
    type: "news",
    title: "Wearables help clinicians spot early heart risk",
    description:
      "A multi-hospital study shows continuous monitoring can flag anomalies days before symptoms appear.",
    imageUrl: PLACEHOLDER("news-health-1"),
    source: "Health Pulse",
    category: "health",
    url: "https://example.com/news/wearables",
    publishedAt: new Date(Date.now() - 1000 * 60 * 260).toISOString(),
    ctaLabel: "Read More",
  },
  {
    type: "news",
    title: "Telescope array maps new exoplanet atmospheres",
    description:
      "Spectroscopy data reveals water vapor signatures on two temperate worlds beyond our solar system.",
    imageUrl: PLACEHOLDER("news-science-1"),
    source: "Orbit Journal",
    category: "science",
    url: "https://example.com/news/exoplanets",
    publishedAt: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
    ctaLabel: "Read More",
  },
];

const baseMovies: Omit<ContentItem, "id">[] = [
  {
    type: "recommendation",
    title: "Neon Horizon",
    description:
      "A courier races across a rain-soaked megacity to deliver a drive that could rewrite digital identity.",
    imageUrl: PLACEHOLDER("movie-tech-1"),
    source: "TMDB",
    category: "technology",
    url: "https://www.themoviedb.org/",
    publishedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    ctaLabel: "Play Now",
    meta: { rating: 8.2 },
  },
  {
    type: "recommendation",
    title: "Final Whistle",
    description:
      "An underdog coach rebuilds a fractured team before the most watched derby of the decade.",
    imageUrl: PLACEHOLDER("movie-sports-1"),
    source: "TMDB",
    category: "sports",
    url: "https://www.themoviedb.org/",
    publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    ctaLabel: "Play Now",
    meta: { rating: 7.6 },
  },
  {
    type: "recommendation",
    title: "Bull & Bear",
    description:
      "Two rival analysts uncover a market scheme that puts their careers—and the economy—on the line.",
    imageUrl: PLACEHOLDER("movie-finance-1"),
    source: "TMDB",
    category: "finance",
    url: "https://www.themoviedb.org/",
    publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    ctaLabel: "Play Now",
    meta: { rating: 7.9 },
  },
  {
    type: "recommendation",
    title: "Midnight Encore",
    description:
      "A fading stage star gets one last chance when a mysterious director offers a career-defining role.",
    imageUrl: PLACEHOLDER("movie-ent-1"),
    source: "TMDB",
    category: "entertainment",
    url: "https://www.themoviedb.org/",
    publishedAt: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
    ctaLabel: "Play Now",
    meta: { rating: 8.0 },
  },
  {
    type: "recommendation",
    title: "Pulse",
    description:
      "A rural clinic doctor races against time when an experimental treatment triggers unexpected side effects.",
    imageUrl: PLACEHOLDER("movie-health-1"),
    source: "TMDB",
    category: "health",
    url: "https://www.themoviedb.org/",
    publishedAt: new Date(Date.now() - 1000 * 60 * 270).toISOString(),
    ctaLabel: "Play Now",
    meta: { rating: 7.4 },
  },
  {
    type: "recommendation",
    title: "Quiet Cosmos",
    description:
      "Astronomers aboard a deep-space probe confront a signal that challenges everything they know about life.",
    imageUrl: PLACEHOLDER("movie-science-1"),
    source: "TMDB",
    category: "science",
    url: "https://www.themoviedb.org/",
    publishedAt: new Date(Date.now() - 1000 * 60 * 330).toISOString(),
    ctaLabel: "Play Now",
    meta: { rating: 8.5 },
  },
];

const baseSocial: Omit<ContentItem, "id">[] = [
  {
    type: "social",
    title: "#BuildInPublic: shipping dashboards that feel alive",
    description:
      "Just dropped a content board with drag-and-drop ordering and preference-aware feeds. Feedback welcome!",
    imageUrl: PLACEHOLDER("social-tech-1"),
    source: "@devpulse",
    category: "technology",
    url: "https://example.com/social/buildinpublic",
    publishedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    ctaLabel: "View Post",
  },
  {
    type: "social",
    title: "#GameDay vibes from the north stand",
    description:
      "That last-minute equalizer still has the whole timeline buzzing. What a finish!",
    imageUrl: PLACEHOLDER("social-sports-1"),
    source: "@sideline",
    category: "sports",
    url: "https://example.com/social/gameday",
    publishedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    ctaLabel: "View Post",
  },
  {
    type: "social",
    title: "#FinTech founders share weekly portfolio routines",
    description:
      "Automation for rebalancing + a 15-minute Friday review. Thread with templates inside.",
    imageUrl: PLACEHOLDER("social-finance-1"),
    source: "@ledgerlife",
    category: "finance",
    url: "https://example.com/social/fintech",
    publishedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    ctaLabel: "View Post",
  },
  {
    type: "social",
    title: "#MovieNight picks that still surprise",
    description:
      "Skip the algorithm sludge—here are five character pieces worth your weekend.",
    imageUrl: PLACEHOLDER("social-ent-1"),
    source: "@reeltalk",
    category: "entertainment",
    url: "https://example.com/social/movienight",
    publishedAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    ctaLabel: "View Post",
  },
  {
    type: "social",
    title: "#WellnessWins: recovery days that actually work",
    description:
      "Sleep, mobility, and one device-free hour. Simple stack, big difference.",
    imageUrl: PLACEHOLDER("social-health-1"),
    source: "@balancehq",
    category: "health",
    url: "https://example.com/social/wellness",
    publishedAt: new Date(Date.now() - 1000 * 60 * 175).toISOString(),
    ctaLabel: "View Post",
  },
  {
    type: "social",
    title: "#SpaceCurious community AMA tonight",
    description:
      "Planetary scientists answering questions about atmospheres, orbits, and upcoming launches.",
    imageUrl: PLACEHOLDER("social-science-1"),
    source: "@stargaze",
    category: "science",
    url: "https://example.com/social/spaceama",
    publishedAt: new Date(Date.now() - 1000 * 60 * 230).toISOString(),
    ctaLabel: "View Post",
  },
];

function withIds(
  items: Omit<ContentItem, "id">[],
  prefix: string,
): ContentItem[] {
  return items.map((item, index) => ({
    ...item,
    id: `${prefix}-${item.category}-${index}`,
  }));
}

export function getMockCatalog(): ContentItem[] {
  return [
    ...withIds(baseNews, "news"),
    ...withIds(baseMovies, "rec"),
    ...withIds(baseSocial, "social"),
  ];
}

export function getMockFeed(
  categories: ContentCategory[],
  page: number,
  pageSize: number,
  query = "",
): { items: ContentItem[]; hasMore: boolean } {
  const selected =
    categories.length > 0
      ? categories
      : (["technology", "entertainment", "sports"] as ContentCategory[]);

  const q = query.trim().toLowerCase();
  const filtered = getMockCatalog()
    .filter((item) => selected.includes(item.category as ContentCategory))
    .filter((item) => {
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  // Expand list for pagination/infinite scroll demos
  const expanded = Array.from({ length: 3 }, (_, cycle) =>
    filtered.map((item) => ({
      ...item,
      id: `${item.id}-p${page}-c${cycle}`,
      title: cycle === 0 ? item.title : `${item.title} (update ${cycle + 1})`,
    })),
  ).flat();

  const start = (page - 1) * pageSize;
  const slice = expanded.slice(start, start + pageSize);

  return {
    items: slice,
    hasMore: start + pageSize < expanded.length,
  };
}

export function getMockTrending(categories: ContentCategory[]): ContentItem[] {
  const feed = getMockFeed(categories, 1, 12).items;
  return feed.slice(0, 6);
}
