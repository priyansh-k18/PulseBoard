import { describe, expect, it } from "vitest";
import reducer, {
  PRESET_PROFILES,
  login,
  logout,
  switchProfile,
  updateProfile,
} from "@/store/slices/authSlice";

describe("authSlice", () => {
  it("initializes with default persona", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.name).toBe("Alex Morgan");
  });

  it("switches to a preset profile", () => {
    let state = reducer(undefined, { type: "@@INIT" });
    state = reducer(state, switchProfile("sarah"));
    expect(state.user.name).toBe(PRESET_PROFILES.sarah.name);
    expect(state.user.role).toBe(PRESET_PROFILES.sarah.role);
  });

  it("updates user profile details", () => {
    let state = reducer(undefined, { type: "@@INIT" });
    state = reducer(
      state,
      updateProfile({
        name: "Jane Dev",
        role: "Frontend Architect",
      }),
    );
    expect(state.user.name).toBe("Jane Dev");
    expect(state.user.role).toBe("Frontend Architect");
  });

  it("handles login and logout", () => {
    let state = reducer(undefined, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user.name).toBe("Guest User");

    state = reducer(state, login(PRESET_PROFILES.david));
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.name).toBe(PRESET_PROFILES.david.name);
  });
});
