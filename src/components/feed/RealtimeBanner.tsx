"use client";

import type { ContentItem } from "@/types/content";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface RealtimeBannerProps {
  onInsertItems: (items: ContentItem[]) => void;
}

export function RealtimeBanner({ onInsertItems }: RealtimeBannerProps) {
  const [incomingItems, setIncomingItems] = useState<ContentItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || isPaused) return;

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource("/api/realtime");

      eventSource.onopen = () => {
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "new_item" && data.item) {
            setIncomingItems((prev) => [data.item, ...prev.slice(0, 9)]);
          }
        } catch {
          // ignore malformed payloads
        }
      };

      eventSource.onerror = () => {
        setIsConnected(false);
      };
    } catch {
      // EventSource initialization error or unsupported
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [isPaused]);

  const handleApply = () => {
    if (incomingItems.length > 0) {
      onInsertItems(incomingItems);
      setIncomingItems([]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isConnected && !isPaused
                ? "bg-emerald-500 animate-pulse"
                : "bg-amber-400"
            }`}
          />
          <span>
            {isPaused
              ? "Live feed paused"
              : isConnected
                ? "Live real-time feed connected (SSE)"
                : "Connecting real-time feed…"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className="rounded-lg px-2 py-1 text-xs hover:bg-[var(--surface-muted)] transition"
        >
          {isPaused ? "Resume live stream" : "Pause live stream"}
        </button>
      </div>

      <AnimatePresence>
        {incomingItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={handleApply}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent-soft)]/60 px-4 py-2.5 text-xs font-semibold text-[var(--foreground)] shadow-sm backdrop-blur transition hover:bg-[var(--accent-soft)]"
            >
              <RefreshCw size={14} className="text-[var(--accent)] animate-spin" />
              <span>
                ✨ {incomingItems.length} new live post
                {incomingItems.length > 1 ? "s" : ""} arrived — Click to load into feed
              </span>
              <Radio size={14} className="text-[var(--accent)]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
