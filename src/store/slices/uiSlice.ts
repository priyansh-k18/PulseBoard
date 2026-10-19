import type { DashboardSection } from "@/types/content";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  darkMode: boolean;
  activeSection: DashboardSection;
  searchQuery: string;
  sidebarOpen: boolean;
}

const initialState: UiState = {
  darkMode: false,
  activeSection: "feed",
  searchQuery: "",
  sidebarOpen: false,
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
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setActiveSection,
  setSearchQuery,
  setSidebarOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
