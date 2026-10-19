"use client";

import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { ALL_CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";
import { getTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { contentApi } from "@/store/api/contentApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetOrder } from "@/store/slices/feedSlice";
import {
  resetPreferences,
  setDisplayName,
  toggleCategory,
} from "@/store/slices/preferencesSlice";
import { setDarkMode } from "@/store/slices/uiSlice";
import type { ContentCategory } from "@/types/content";
import { motion } from "framer-motion";

export function SettingsPanel() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.preferences.categories);
  const displayName = useAppSelector((state) => state.preferences.displayName);
  const darkMode = useAppSelector((state) => state.ui.darkMode);
  const language = useAppSelector((state) => state.ui.language || "en");

  const onToggleCategory = (category: ContentCategory) => {
    dispatch(toggleCategory(category));
    dispatch(contentApi.util.invalidateTags(["Feed", "Trending"]));
    dispatch(resetOrder());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl space-y-6"
      data-testid="settings-panel"
    >
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)]">
          Profile
        </h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Customize how you appear across the dashboard.
        </p>
        <label className="mt-4 block text-sm font-medium text-[var(--foreground)]">
          Display name
          <input
            type="text"
            value={displayName}
            onChange={(event) => dispatch(setDisplayName(event.target.value))}
            className="mt-2 h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25"
            data-testid="display-name-input"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)]">
          Content preferences
        </h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Choose the categories that power your personalized feed. Preferences
          persist in local storage via Redux Persist.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ALL_CATEGORIES.map((category) => {
            const active = categories.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => onToggleCategory(category)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left transition",
                  active
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--foreground)]"
                    : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--accent)]/50",
                )}
                data-testid={`category-${category}`}
                aria-pressed={active}
              >
                <span className="block text-sm font-semibold">
                  {CATEGORY_LABELS[category]}
                </span>
                <span className="mt-1 block text-xs opacity-80">
                  {active ? "Included in feed" : "Tap to include"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)]">
          Appearance
        </h3>
        <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              Dark mode
            </p>
            <p className="text-xs text-[var(--muted)]">
              Uses CSS custom properties + Tailwind theme tokens
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={darkMode}
            onClick={() => dispatch(setDarkMode(!darkMode))}
            className={cn(
              "relative h-7 w-12 rounded-full transition",
              darkMode ? "bg-[var(--accent)]" : "bg-[var(--border)]",
            )}
            data-testid="dark-mode-switch"
          >
            <span
              className={cn(
                "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition",
                darkMode ? "left-5" : "left-0.5",
              )}
            />
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)]">
          {getTranslation(language, "language")}
        </h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {getTranslation(language, "languageDesc")}
        </p>
        <div className="mt-4">
          <LanguageSelector />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            dispatch(resetPreferences());
            dispatch(contentApi.util.invalidateTags(["Feed", "Trending"]));
            dispatch(resetOrder());
          }}
          className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
        >
          Reset preferences
        </button>
      </div>
    </motion.div>
  );
}
