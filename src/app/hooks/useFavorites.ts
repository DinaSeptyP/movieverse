"use client";

import { useEffect, useState, useCallback } from "react";
import type { Movie } from "../lib/tmdb";

const STORAGE_KEY = "favorites_v1";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [pending, setPending] = useState<Movie[] | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setFavorites(raw ? JSON.parse(raw) : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  // Sync to storage only when state changes, not inside render
  useEffect(() => {
    if (!pending) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
      window.dispatchEvent(
        new CustomEvent("favorites_updated", { detail: pending })
      );
    } catch {}
    setPending(null);
  }, [pending]);

  // Listen to changes (other tabs/same tab)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };

    const onCustom = (e: any) => {
      setFavorites(e.detail);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("favorites_updated", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("favorites_updated", onCustom);
    };
  }, []);

  // no storage access inside these functions
  const toggleFavorite = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      const next = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];
      setPending(next);
      return next;
    });
  }, []);

  const addFavorite = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const next = [...prev, movie];
      setPending(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = prev.filter((m) => m.id !== id);
      setPending(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((m) => m.id === id),
    [favorites]
  );

  return { favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite };
}
