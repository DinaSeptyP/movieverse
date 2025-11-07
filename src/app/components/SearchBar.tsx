"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Movie } from "../lib/tmdb";
import { searchMovies } from "../lib/tmdb";
import MovieCard from "./MovieCard";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(
    async (q: string) => {
      if (!q) {
        setResults([]);
        router.push("/");
        return;
      }

      router.push(`/?q=${q}`);

      setLoading(true);
      const data = await searchMovies(q);
      setResults(data.results);
      setLoading(false);
    },
    [router]
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query !== defaultQuery) fetchMovies(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [query, defaultQuery, fetchMovies]);

  useEffect(() => {
    if (!defaultQuery) return;

    const timeout = setTimeout(() => {
      fetchMovies(defaultQuery);
    }, 0);

    return () => clearTimeout(timeout);
  }, [defaultQuery, fetchMovies]);

  return (
    <div className="max-w-7xl mx-auto mt-4 md:mt-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchMovies(query);
        }}
      >
        <input
          placeholder="Search movies..."
          className="border p-2 w-full bg-black/30 text-white backdrop-blur-md rounded-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {loading && <p className="text-gray-400 mt-3 text-sm">Searching...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
