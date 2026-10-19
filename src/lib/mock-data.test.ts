import { getMockFeed } from "@/lib/mock-data";
import { describe, expect, it } from "vitest";

describe("getMockFeed", () => {
  it("filters by category preferences", () => {
    const { items } = getMockFeed(["technology"], 1, 20);
    expect(items.length).toBeGreaterThan(0);
    expect(
      items.every((item) => item.category === "technology" || item.id.includes("technology")),
    ).toBe(true);
  });

  it("supports search queries and empty results", () => {
    const hit = getMockFeed(["technology", "sports"], 1, 20, "AI chips");
    expect(hit.items.length).toBeGreaterThan(0);

    const miss = getMockFeed(["technology"], 1, 20, "zzzz-no-match");
    expect(miss.items).toHaveLength(0);
    expect(miss.hasMore).toBe(false);
  });

  it("paginates results", () => {
    const page1 = getMockFeed(["technology", "sports", "entertainment"], 1, 6);
    const page2 = getMockFeed(["technology", "sports", "entertainment"], 2, 6);
    expect(page1.items).toHaveLength(6);
    expect(page1.hasMore).toBe(true);
    expect(page2.items[0]?.id).not.toBe(page1.items[0]?.id);
  });
});
