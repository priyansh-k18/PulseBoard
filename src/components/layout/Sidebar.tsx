"use client";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveSection, setSidebarOpen } from "@/store/slices/uiSlice";
import type { DashboardSection } from "@/types/content";
import {
  Flame,
  Heart,
  LayoutGrid,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";

const navItems: Array<{
  id: DashboardSection;
  label: string;
  icon: typeof LayoutGrid;
}> = [
  { id: "feed", label: "Personalized Feed", icon: LayoutGrid },
  { id: "trending", label: "Trending", icon: Flame },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings2 },
];

export function Sidebar() {
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const displayName = useAppSelector((state) => state.preferences.displayName);
  const categories = useAppSelector((state) => state.preferences.categories);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition lg:hidden",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => dispatch(setSidebarOpen(false))}
        aria-hidden={!sidebarOpen}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[var(--border)] bg-[var(--sidebar)] p-5 transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        data-testid="sidebar"
      >
        <div className="mb-8 flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-[var(--accent)]">
              <Sparkles size={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Pulseboard
              </span>
            </div>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight text-[var(--foreground)]">
              Content Dashboard
            </h1>
          </div>
          <button
            type="button"
            className="rounded-lg p-1 text-[var(--muted)] lg:hidden"
            onClick={() => dispatch(setSidebarOpen(false))}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1" aria-label="Dashboard">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => dispatch(setActiveSection(item.id))}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition",
                  active
                    ? "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm"
                    : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]",
                )}
                data-testid={`nav-${item.id}`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Signed in as
          </p>
          <p className="mt-1 font-semibold text-[var(--foreground)]">
            {displayName}
          </p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Tracking {categories.length} categories
          </p>
        </div>
      </aside>
    </>
  );
}
