"use client";

import { SearchBar } from "@/components/search/SearchBar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveSection, setSidebarOpen } from "@/store/slices/uiSlice";
import { Menu, UserRound } from "lucide-react";

const titles = {
  feed: "Personalized Feed",
  trending: "Trending Now",
  favorites: "Your Favorites",
  settings: "Preferences & Settings",
} as const;

export function Header() {
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const displayName = useAppSelector((state) => state.preferences.displayName);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--header)]/90 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] lg:hidden"
              onClick={() => dispatch(setSidebarOpen(true))}
              aria-label="Open navigation"
              data-testid="open-sidebar"
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Dashboard
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)] sm:text-2xl">
                {titles[activeSection]}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => dispatch(setActiveSection("settings"))}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] transition hover:border-[var(--accent)]"
              data-testid="account-button"
            >
              <UserRound size={16} />
              <span className="hidden sm:inline">{displayName}</span>
            </button>
          </div>
        </div>

        {(activeSection === "feed" || activeSection === "trending") && (
          <SearchBar />
        )}
      </div>
    </header>
  );
}
