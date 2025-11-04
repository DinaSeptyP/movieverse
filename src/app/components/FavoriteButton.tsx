"use client";

import useFavorites from "@/app/hooks/useFavorites";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { Movie } from "@/app/lib/tmdb";

export default function FavoriteButton({ movie }: { movie: Movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie.id);

  return (
    <button
      onClick={() => toggleFavorite(movie)}
      className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md transition
        ${fav ? "bg-red-600 hover:bg-red-700" : "bg-white/10 hover:bg-white/20"}
      `}
    >
      {fav ? (
        <FaHeart size={18} className="text-red-950" />
      ) : (
        <FaRegHeart size={18} />
      )}
      {fav ? "Added to Favorites" : "Add to Favorites"}
    </button>
  );
}
