"use client";

import useFavorites from "@/app/hooks/useFavorites";
import MovieCard from "@/app/components/MovieCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen px-6 pb-10 w-full bg-black/95 backdrop-blur-lg relative z-50 p-6 pointer-events-auto">
      <h1 className="text-3xl font-bold text-white mb-6">My Favorites ❤️</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-lg">
          You haven't added any favorite movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
