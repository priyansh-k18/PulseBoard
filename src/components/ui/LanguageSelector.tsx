"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage, type AppLanguage } from "@/store/slices/uiSlice";
import { Globe } from "lucide-react";

const languages: Array<{ code: AppLanguage; label: string; flag: string }> = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
];

export function LanguageSelector() {
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector((state) => state.ui.language || "en");

  return (
    <div className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 text-xs">
      <Globe size={14} className="ml-1.5 mr-0.5 text-[var(--muted)]" />
      {languages.map((lang) => {
        const isActive = currentLang === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => dispatch(setLanguage(lang.code))}
            className={`rounded-lg px-2 py-1 font-medium transition ${
              isActive
                ? "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-xs"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
            aria-label={`Switch language to ${lang.label}`}
            aria-pressed={isActive}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
