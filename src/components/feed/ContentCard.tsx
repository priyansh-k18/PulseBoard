"use client";

import { RelativeTime } from "@/components/ui/RelativeTime";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import type { ContentItem } from "@/types/content";
import { motion } from "framer-motion";
import { ExternalLink, GripVertical, Heart } from "lucide-react";

interface ContentCardProps {
  item: ContentItem;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
  isDragging?: boolean;
}

const typeStyles: Record<ContentItem["type"], string> = {
  news: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  recommendation: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  social: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
};

export function ContentCard({
  item,
  dragHandleProps,
  isDragging,
}: ContentCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((fav) => fav.id === item.id),
  );

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]",
        isDragging && "opacity-80 ring-2 ring-[var(--accent)]",
      )}
      data-testid="content-card"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-muted)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
              typeStyles[item.type],
            )}
          >
            {item.type}
          </span>
          <div className="flex items-center gap-2">
            {dragHandleProps && (
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black/45 text-white backdrop-blur"
                aria-label="Drag to reorder"
                data-testid="drag-handle"
                {...dragHandleProps}
              >
                <GripVertical size={16} />
              </button>
            )}
            <button
              type="button"
              onClick={() => dispatch(toggleFavorite(item))}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black/45 text-white backdrop-blur transition",
                isFavorite && "text-rose-400",
              )}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              data-testid="favorite-toggle"
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-[var(--muted)]">
          <span className="truncate font-medium capitalize">{item.category}</span>
          <RelativeTime isoDate={item.publishedAt} />
        </div>

        <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-[var(--foreground)]">
          {item.title}
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="truncate text-xs text-[var(--muted)]">
            {item.source}
            {typeof item.meta?.rating === "number"
              ? ` · ★ ${Number(item.meta.rating).toFixed(1)}`
              : ""}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--accent-contrast)] transition hover:brightness-110"
          >
            {item.ctaLabel}
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
