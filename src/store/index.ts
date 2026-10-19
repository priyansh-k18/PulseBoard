import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { contentApi } from "@/store/api/contentApi";
import storage from "@/store/storage";
import authReducer from "@/store/slices/authSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";
import feedReducer from "@/store/slices/feedSlice";
import preferencesReducer from "@/store/slices/preferencesSlice";
import uiReducer from "@/store/slices/uiSlice";

const persistConfig = {
  key: "pcd-root",
  storage,
  whitelist: ["preferences", "favorites", "ui", "feed", "auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  preferences: preferencesReducer,
  favorites: favoritesReducer,
  ui: uiReducer,
  feed: feedReducer,
  [contentApi.reducerPath]: contentApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(contentApi.middleware),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
