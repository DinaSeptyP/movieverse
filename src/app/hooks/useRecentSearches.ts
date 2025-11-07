"use client";
import { useState, useEffect, useCallback } from "react";

export default function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Run after render to avoid SSR issues
    Promise.resolve().then(() => {
      const stored = localStorage.getItem("recentSearches");
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch {
          console.warn("Failed to parse recent searches");
        }
      }
    });
  }, []);

  const addSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    setRecentSearches((prev) => {
      const updated = [query, ...prev.filter((q) => q !== query)].slice(0, 8);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearSearches = useCallback(() => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  }, []);

  return { recentSearches, addSearch, clearSearches };
}
