"use client";

import useWatchlist from "@/app/hooks/useWatchlist";
import MovieCard from "../components/MovieCard";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">🎥 Watchlist</h1>

      {watchlist.length === 0 && (
        <p className="text-gray-400">No movies in watchlist yet.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
