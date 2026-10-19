"use client";

import { ContentCard } from "@/components/feed/ContentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearFavorites } from "@/store/slices/favoritesSlice";
import { motion } from "framer-motion";

export function FavoritesSection() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  if (!favorites.length) {
    return (
      <EmptyState
        title="No favorites yet"
        description="Tap the heart on any content card to save it here."
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]">
          {favorites.length} saved item{favorites.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={() => dispatch(clearFavorites())}
          className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm text-[var(--muted)] transition hover:border-rose-400 hover:text-rose-500"
          data-testid="clear-favorites"
        >
          Clear all
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        data-testid="favorites-grid"
      >
        {favorites.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
