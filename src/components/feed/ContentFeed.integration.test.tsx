import { ContentFeed } from "@/components/feed/ContentFeed";
import { renderWithProviders } from "@/test/test-utils";
import { cleanup, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockResponse = {
  items: [
    {
      id: "news-tech-0",
      type: "news",
      title: "AI chips reshape cloud infrastructure spending",
      description: "Enterprises are reallocating budgets.",
      imageUrl: "https://picsum.photos/seed/a/640/360",
      source: "Tech Daily",
      category: "technology",
      url: "https://example.com",
      publishedAt: new Date().toISOString(),
      ctaLabel: "Read More",
    },
  ],
  page: 1,
  hasMore: false,
  source: "mock" as const,
};

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ContentFeed integration", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json(mockResponse, {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
  });

  it("renders fetched content cards", async () => {
    renderWithProviders(<ContentFeed />);

    await waitFor(() => {
      expect(
        screen.getByText("AI chips reshape cloud infrastructure spending"),
      ).toBeInTheDocument();
    });
  });

  it("shows empty state when API returns no items", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json(
          {
            items: [],
            page: 1,
            hasMore: false,
            source: "mock",
          },
          { status: 200 },
        ),
      ),
    );

    renderWithProviders(<ContentFeed />);

    await waitFor(() => {
      expect(screen.getByText("No content found")).toBeInTheDocument();
    });
  });
});
