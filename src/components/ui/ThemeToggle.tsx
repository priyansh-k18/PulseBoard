"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDarkMode } from "@/store/slices/uiSlice";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.ui.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleDarkMode())}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="theme-toggle"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
