"use client";

import { cn } from "@/lib/utils";

export function LoadingSpinner({
  label = "Loading content…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-[var(--muted)]",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
