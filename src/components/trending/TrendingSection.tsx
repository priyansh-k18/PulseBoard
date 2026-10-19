"use client";

import { ContentCard } from "@/components/feed/ContentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useGetTrendingQuery } from "@/store/api/contentApi";
import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";

export function TrendingSection() {
  const categories = useAppSelector((state) => state.preferences.categories);
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const { data, isLoading, isError } = useGetTrendingQuery({ categories });

  const items = (data?.items ?? []).filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q)
    );
  });

  if (isLoading) return <LoadingSpinner label="Loading trending items…" />;
  if (isError) {
    return (
      <EmptyState
        title="Trending unavailable"
        description="We couldn't load trending content right now."
      />
    );
  }
  if (!items.length) {
    return (
      <EmptyState
        title="Nothing trending yet"
        description="Update your categories or clear the search filter."
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      data-testid="trending-grid"
    >
      {items.map((item, index) => (
        <div key={item.id} className="relative">
          <span className="absolute -left-2 -top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--accent-contrast)] shadow">
            {index + 1}
          </span>
          <ContentCard item={item} />
        </div>
      ))}
    </motion.div>
  );
}
