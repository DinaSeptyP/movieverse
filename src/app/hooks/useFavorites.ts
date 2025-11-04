"use client";
import { useState, useEffect } from "react";
import type { Movie } from "../lib/tmdb";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const save = (data: Movie[]) => {
    setFavorites(data);
    localStorage.setItem("favorites", JSON.stringify(data));
  };

  const addFavorite = (movie: Movie) => {
    if (!favorites.some((m) => m.id === movie.id)) {
      save([...favorites, movie]);
    }
  };

  const removeFavorite = (id: number) => {
    save(favorites.filter((m) => m.id !== id));
  };

  const toggleFavorite = (movie: Movie) => {
    favorites.some((m) => m.id === movie.id)
      ? removeFavorite(movie.id)
      : addFavorite(movie);
  };

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite };
}
