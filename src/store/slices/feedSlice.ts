import type { ContentItem } from "@/types/content";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FeedState {
  orderedIds: string[];
  customOrderActive: boolean;
}

const initialState: FeedState = {
  orderedIds: [],
  customOrderActive: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setOrderedIds(state, action: PayloadAction<string[]>) {
      state.orderedIds = action.payload;
      state.customOrderActive = true;
    },
    syncOrderedIds(state, action: PayloadAction<ContentItem[]>) {
      const incomingIds = action.payload.map((item) => item.id);
      if (!state.customOrderActive || state.orderedIds.length === 0) {
        state.orderedIds = incomingIds;
        return;
      }

      const existing = state.orderedIds.filter((id) =>
        incomingIds.includes(id),
      );
      const newcomers = incomingIds.filter((id) => !existing.includes(id));
      state.orderedIds = [...existing, ...newcomers];
    },
    resetOrder(state) {
      state.customOrderActive = false;
      state.orderedIds = [];
    },
  },
});

export const { setOrderedIds, syncOrderedIds, resetOrder } = feedSlice.actions;
export default feedSlice.reducer;
