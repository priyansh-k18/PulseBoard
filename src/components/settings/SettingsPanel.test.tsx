import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { renderWithProviders } from "@/test/test-utils";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

afterEach(() => cleanup());

describe("SettingsPanel", () => {
  it("updates display name and toggles a category", () => {
    const { store } = renderWithProviders(<SettingsPanel />);

    const input = screen.getByTestId("display-name-input");
    fireEvent.change(input, { target: { value: "Jordan" } });
    expect(store.getState().preferences.displayName).toBe("Jordan");

    const health = screen.getByTestId("category-health");
    fireEvent.click(health);
    expect(store.getState().preferences.categories).toContain("health");
  });

  it("toggles dark mode", () => {
    const { store } = renderWithProviders(<SettingsPanel />);
    expect(store.getState().ui.darkMode).toBe(false);

    fireEvent.click(screen.getByTestId("dark-mode-switch"));
    expect(store.getState().ui.darkMode).toBe(true);
  });
});
