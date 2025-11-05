"use client";

import useWatchlist from "@/app/hooks/useWatchlist";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import type { Movie } from "@/app/lib/tmdb";

export default function WatchlistButton({ movie }: { movie: Movie }) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const inList = isInWatchlist(movie.id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleWatchlist(movie);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition border backdrop-blur-md
        ${
          inList
            ? "bg-blue-600/80 border-blue-500 text-white hover:bg-blue-700"
            : "bg-white/10 border-blue-500/40 hover:bg-blue-600/30 hover:border-blue-400"
        }
        shadow-[0_0_10px_rgba(0,150,255,0.4)]
      `}
    >
      {inList ? <FaBookmark /> : <FaRegBookmark />}
      {inList ? "In Watchlist" : "Add to Watchlist"}
    </button>
  );
}
