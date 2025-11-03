"use client";

import { useState } from "react";
import type { Movie } from "../lib/tmdb";
import { searchMovies } from "../lib/tmdb";
import MovieCard from "./MovieCard";


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;

    const movies = await searchMovies(query);
    setResults(movies);
  }

  return (
    <div className="max-w-5xl mx-auto mt-4 md:mt-6">
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search movies..."
          className="border p-2 w-full bg-black/30 text-white backdrop-blur-md rounded-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
