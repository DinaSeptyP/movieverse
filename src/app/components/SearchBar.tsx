"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Movie } from "../lib/tmdb";
import { searchMovies } from "../lib/tmdb";
import MovieCard from "./MovieCard";
import useRecentSearches from "../hooks/useRecentSearches";
import RecentSearches from "./RecentSearches";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { recentSearches, addSearch, clearSearches } = useRecentSearches();

  const defaultQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRecent, setShowRecent] = useState(false);

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
      addSearch(q);
    },
    [router, addSearch]
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

  // close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".search-wrapper")) setShowRecent(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-4 md:mt-6">
      <div className="relative search-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchMovies(query);
            setShowRecent(false);
          }}
        >
          <input
            placeholder="Search movies..."
            className="border p-2 w-full bg-black/30 text-white backdrop-blur-md rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowRecent(true);
            }}
            onFocus={() => setShowRecent(true)}
          />
        </form>

        {/* Recent search dropdown */}
        {showRecent && recentSearches.length > 0 && (
          <div className="absolute z-50 mt-2 w-full bg-black/90 rounded-lg p-3 border border-gray-800 backdrop-blur-xl">
            <RecentSearches
              searches={recentSearches}
              onClick={(search) => {
                setQuery(search);
                fetchMovies(search);
                setShowRecent(false);
              }}
              onClear={() => {
                clearSearches();
                setShowRecent(false);
              }}
            />
          </div>
        )}
      </div>

      {loading && <p className="text-gray-400 mt-3 text-sm">Searching...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
