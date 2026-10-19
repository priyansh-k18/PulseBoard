import { DEFAULT_CATEGORIES } from "@/lib/constants";
import type { ContentCategory } from "@/types/content";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PreferencesState {
  categories: ContentCategory[];
  displayName: string;
}

const initialState: PreferencesState = {
  categories: DEFAULT_CATEGORIES,
  displayName: "Guest User",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ContentCategory[]>) {
      state.categories =
        action.payload.length > 0 ? action.payload : DEFAULT_CATEGORIES;
    },
    toggleCategory(state, action: PayloadAction<ContentCategory>) {
      const category = action.payload;
      if (state.categories.includes(category)) {
        if (state.categories.length === 1) return;
        state.categories = state.categories.filter((c) => c !== category);
      } else {
        state.categories.push(category);
      }
    },
    setDisplayName(state, action: PayloadAction<string>) {
      state.displayName = action.payload.trim() || "Guest User";
    },
    resetPreferences() {
      return initialState;
    },
  },
});

export const {
  setCategories,
  toggleCategory,
  setDisplayName,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
