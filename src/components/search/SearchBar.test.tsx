import { SearchBar } from "@/components/search/SearchBar";
import { renderWithProviders } from "@/test/test-utils";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

afterEach(() => cleanup());

describe("SearchBar", () => {
  it("debounces search updates into Redux", async () => {
    const { store } = renderWithProviders(<SearchBar />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "space" },
    });

    expect(store.getState().ui.searchQuery).toBe("");

    await waitFor(
      () => {
        expect(store.getState().ui.searchQuery).toBe("space");
      },
      { timeout: 1500 },
    );
  });
});
