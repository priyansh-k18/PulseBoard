import { describe, expect, it } from "vitest";
import reducer, {
  resetPreferences,
  setDisplayName,
  toggleCategory,
} from "@/store/slices/preferencesSlice";

describe("preferencesSlice", () => {
  it("toggles categories on and off", () => {
    let state = reducer(undefined, { type: "@@INIT" });
    expect(state.categories).toContain("technology");

    state = reducer(state, toggleCategory("health"));
    expect(state.categories).toContain("health");

    state = reducer(state, toggleCategory("health"));
    expect(state.categories).not.toContain("health");
  });

  it("does not remove the last remaining category", () => {
    let state = reducer(undefined, { type: "@@INIT" });
    state = {
      ...state,
      categories: ["sports"],
    };

    state = reducer(state, toggleCategory("sports"));
    expect(state.categories).toEqual(["sports"]);
  });

  it("normalizes empty display names", () => {
    let state = reducer(undefined, setDisplayName("Ada Lovelace"));
    expect(state.displayName).toBe("Ada Lovelace");

    state = reducer(state, setDisplayName("   "));
    expect(state.displayName).toBe("Guest User");
  });

  it("resets preferences to defaults", () => {
    let state = reducer(undefined, setDisplayName("Tester"));
    state = reducer(state, toggleCategory("science"));
    state = reducer(state, resetPreferences());
    expect(state.displayName).toBe("Guest User");
    expect(state.categories).toEqual([
      "technology",
      "entertainment",
      "sports",
    ]);
  });
});
