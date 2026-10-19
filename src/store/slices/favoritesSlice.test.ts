import type { ContentItem } from "@/types/content";
import { describe, expect, it } from "vitest";
import reducer, {
  clearFavorites,
  toggleFavorite,
} from "@/store/slices/favoritesSlice";

const sample: ContentItem = {
  id: "news-1",
  type: "news",
  title: "Sample",
  description: "Desc",
  imageUrl: "https://example.com/a.jpg",
  source: "Test",
  category: "technology",
  url: "https://example.com",
  publishedAt: new Date().toISOString(),
  ctaLabel: "Read More",
};

describe("favoritesSlice", () => {
  it("adds and removes favorites", () => {
    let state = reducer(undefined, toggleFavorite(sample));
    expect(state.items).toHaveLength(1);

    state = reducer(state, toggleFavorite(sample));
    expect(state.items).toHaveLength(0);
  });

  it("clears favorites", () => {
    let state = reducer(undefined, toggleFavorite(sample));
    state = reducer(state, clearFavorites());
    expect(state.items).toEqual([]);
  });
});
