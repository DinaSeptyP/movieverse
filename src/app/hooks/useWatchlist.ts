"use client";

import { useEffect, useState, useCallback } from "react";
import type { Movie } from "../lib/tmdb";

const STORAGE_KEY = "watchlist_v1";

// read
function readList(): Movie[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

// write
function writeList(data: Movie[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("watchlist_updated"));
  } catch {}
}

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    setWatchlist(readList());

    const onCustom = () => setWatchlist(readList());
    window.addEventListener("watchlist_updated", onCustom);

    return () => {
      window.removeEventListener("watchlist_updated", onCustom);
    };
  }, []);

  const toggleWatchlist = useCallback((movie: Movie) => {
    setWatchlist(prev => {
      const exists = prev.some(m => m.id === movie.id);
      const next = exists
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie];

      writeList(next);
      return next;
    });
  }, []);

  const isInWatchlist = useCallback(
    (id: number) => watchlist.some(m => m.id === id),
    [watchlist]
  );

  return { watchlist, toggleWatchlist, isInWatchlist };
}