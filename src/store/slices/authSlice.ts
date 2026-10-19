import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile;
}

export const PRESET_PROFILES: Record<string, UserProfile> = {
  alex: {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "Senior AI & Tech Lead",
    bio: "Tracking machine learning developments, systems architecture, and edge computing.",
    avatar: "⚡",
  },
  sarah: {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Media Curator & Critic",
    bio: "Passionate about international cinema, digital storytelling, and entertainment trends.",
    avatar: "🎬",
  },
  david: {
    name: "David Kim",
    email: "david.kim@example.com",
    role: "Fintech & Markets Analyst",
    bio: "Analyzing venture capital flows, decentralized markets, and macroeconomic trends.",
    avatar: "📈",
  },
};

const initialState: AuthState = {
  isAuthenticated: true,
  user: PRESET_PROFILES.alex,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserProfile>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        name: "Guest User",
        email: "guest@example.com",
        role: "Visitor",
        bio: "Browsing in guest mode.",
        avatar: "👤",
      };
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    switchProfile: (state, action: PayloadAction<string>) => {
      const preset = PRESET_PROFILES[action.payload];
      if (preset) {
        state.isAuthenticated = true;
        state.user = preset;
      }
    },
  },
});

export const { login, logout, updateProfile, switchProfile } =
  authSlice.actions;
export default authSlice.reducer;
