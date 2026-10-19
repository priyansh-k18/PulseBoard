"use client";

import { SortableFeed } from "@/components/feed/SortableFeed";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useGetFeedQuery } from "@/store/api/contentApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { syncOrderedIds } from "@/store/slices/feedSlice";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export function ContentFeed() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.preferences.categories);
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const orderedIds = useAppSelector((state) => state.feed.orderedIds);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPage(1);
  }, [categories, searchQuery]);

  const { data, isLoading, isFetching, isError, error } = useGetFeedQuery({
    categories,
    page,
    query: searchQuery,
  });

  useEffect(() => {
    if (data?.items) {
      dispatch(syncOrderedIds(data.items));
    }
  }, [data?.items, dispatch]);

  const orderedItems = useMemo(() => {
    const items = data?.items ?? [];
    if (!orderedIds.length) return items;
    const map = new Map(items.map((item) => [item.id, item]));
    const ordered = orderedIds
      .map((id) => map.get(id))
      .filter(Boolean) as typeof items;
    const leftovers = items.filter((item) => !orderedIds.includes(item.id));
    return [...ordered, ...leftovers];
  }, [data?.items, orderedIds]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && data?.hasMore && !isFetching) {
          setPage((current) => current + 1);
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [data?.hasMore, isFetching]);

  if (isLoading && page === 1) {
    return <LoadingSpinner label="Personalizing your feed…" />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Could not load content"
        description={
          (error as { status?: number })?.status
            ? "The API request failed. Check your network or API keys."
            : "Something went wrong while fetching your feed."
        }
      />
    );
  }

  if (!orderedItems.length) {
    return (
      <EmptyState
        title="No content found"
        description="Try adjusting your categories or search query."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]">
          Showing {orderedItems.length} items
          {data?.source === "mock"
            ? " · demo data (add API keys for live sources)"
            : " · live API data"}
        </p>
        <p className="text-xs text-[var(--muted)]">
          Drag cards by the handle to reorder your feed
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${categories.join("-")}-${searchQuery}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <SortableFeed items={orderedItems} />
        </motion.div>
      </AnimatePresence>

      <div ref={loadMoreRef} className="py-4">
        {isFetching && page > 1 && (
          <LoadingSpinner label="Loading more…" className="py-4" />
        )}
        {!data?.hasMore && (
          <p className="text-center text-sm text-[var(--muted)]">
            You&apos;ve reached the end of this feed.
          </p>
        )}
      </div>
    </div>
  );
}
