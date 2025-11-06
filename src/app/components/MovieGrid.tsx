"use client";

import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  if (!movies?.length) {
    return <p className="text-gray-400 mt-8">No movies found 😢</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200"
        >
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="h-[450px] flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div className="p-3">
            <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
            <p className="text-xs text-gray-400">⭐ {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
