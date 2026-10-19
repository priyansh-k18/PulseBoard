"use client";

import { ContentFeed } from "@/components/feed/ContentFeed";
import { FavoritesSection } from "@/components/favorites/FavoritesSection";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { TrendingSection } from "@/components/trending/TrendingSection";
import { useAppSelector } from "@/store/hooks";
import { AnimatePresence, motion } from "framer-motion";

export function DashboardShell() {
  const activeSection = useAppSelector((state) => state.ui.activeSection);

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {activeSection === "feed" && <ContentFeed />}
              {activeSection === "trending" && <TrendingSection />}
              {activeSection === "favorites" && <FavoritesSection />}
              {activeSection === "settings" && <SettingsPanel />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
