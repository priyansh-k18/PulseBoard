"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/uiSlice";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const storedQuery = useAppSelector((state) => state.ui.searchQuery);
  const [value, setValue] = useState(storedQuery);
  const debounced = useDebounce(value, 400);

  useEffect(() => {
    setValue(storedQuery);
  }, [storedQuery]);

  useEffect(() => {
    if (debounced !== storedQuery) {
      dispatch(setSearchQuery(debounced));
    }
  }, [debounced, dispatch, storedQuery]);

  return (
    <div className="relative w-full max-w-xl">
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search news, movies, or posts…"
        className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-10 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25"
        aria-label="Search content"
        data-testid="search-input"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
