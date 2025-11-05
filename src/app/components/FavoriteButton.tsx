"use client";

import useFavorites from "@/app/hooks/useFavorites";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { Movie } from "@/app/lib/tmdb";

export default function FavoriteButton({ movie }: { movie: Movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition
        border backdrop-blur-md
        ${
          fav
            ? "bg-red-600/80 border-red-500 text-white hover:bg-red-700"
            : "bg-white/10 border-pink-500/40 hover:bg-pink-600/30 hover:border-pink-400"
        }
        shadow-[0_0_10px_rgba(255,0,200,0.4)]
      `}
    >
      {fav ? (
        <FaHeart size={18} className="animate-pulse" />
      ) : (
        <FaRegHeart size={18} />
      )}
      {fav ? "Favorited" : "Add to Favorites"}
    </button>
  );
}
