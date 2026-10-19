"use client";

import { AuthModal } from "@/components/auth/AuthModal";
import { SearchBar } from "@/components/search/SearchBar";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getTranslation } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSidebarOpen } from "@/store/slices/uiSlice";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const language = useAppSelector((state) => state.ui.language || "en");
  const auth = useAppSelector((state) => state.auth);
  const displayName = useAppSelector((state) => state.preferences.displayName);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const sectionTitleKey =
    activeSection === "feed"
      ? "feed"
      : activeSection === "trending"
        ? "trending"
        : activeSection === "favorites"
          ? "favorites"
          : "settings";

  return (
    <>
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
                  {getTranslation(language, "dashboard")}
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--foreground)] sm:text-2xl">
                  {getTranslation(language, sectionTitleKey)}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSelector />
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] transition hover:border-[var(--accent)]"
                data-testid="account-button"
                aria-label="Account profile settings"
              >
                <span className="text-sm">{auth.user.avatar || "👤"}</span>
                <span className="hidden sm:inline font-medium">
                  {displayName || auth.user.name}
                </span>
              </button>
            </div>
          </div>

          {(activeSection === "feed" || activeSection === "trending") && (
            <SearchBar />
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
