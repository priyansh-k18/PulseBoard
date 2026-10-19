import { ContentCard } from "@/components/feed/ContentCard";
import { renderWithProviders } from "@/test/test-utils";
import type { ContentItem } from "@/types/content";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const item: ContentItem = {
  id: "card-1",
  type: "news",
  title: "Frontend dashboards are evolving",
  description: "A short summary for testing.",
  imageUrl: "https://picsum.photos/seed/test/640/360",
  source: "Unit Test",
  category: "technology",
  url: "https://example.com/article",
  publishedAt: new Date().toISOString(),
  ctaLabel: "Read More",
};

describe("ContentCard", () => {
  it("renders content details and favorites an item", () => {
    const { store } = renderWithProviders(<ContentCard item={item} />);

    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("favorite-toggle"));
    expect(store.getState().favorites.items).toHaveLength(1);
    expect(store.getState().favorites.items[0]?.id).toBe("card-1");
  });
});
