import type { DashboardSection } from "@/types/content";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AppLanguage = "en" | "es" | "fr";

export interface UiState {
  darkMode: boolean;
  activeSection: DashboardSection;
  searchQuery: string;
  sidebarOpen: boolean;
  language: AppLanguage;
}

const initialState: UiState = {
  darkMode: false,
  activeSection: "feed",
  searchQuery: "",
  sidebarOpen: false,
  language: "en",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    setActiveSection(state, action: PayloadAction<DashboardSection>) {
      state.activeSection = action.payload;
      state.sidebarOpen = false;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setLanguage(state, action: PayloadAction<AppLanguage>) {
      state.language = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setActiveSection,
  setSearchQuery,
  setSidebarOpen,
  setLanguage,
} = uiSlice.actions;

export default uiSlice.reducer;
