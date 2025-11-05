"use client";

import { motion } from "framer-motion";
import type { Movie } from "../lib/tmdb";
import useFavorites from "../hooks/useFavorites";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie.id);

  const rating = movie.vote_average ?? 0;
  const votes = movie.vote_count ?? 0;

  return (
    <div className="relative">
      <button
        className="absolute top-2 right-2 z-20 text-red-500"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // stop event bubble ke Link
          toggleFavorite(movie);
        }}
      >
        {fav ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
      </button>

      <Link href={`/movie/${movie.id}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg cursor-pointer"
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-400 text-sm font-semibold">
              No Poster Available
            </div>
          )}

          <div className="p-2 text-white">
            <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
            <p className="text-xs text-gray-300">
              {movie.release_date?.slice(0, 4) || "Unknown"} • ⭐{" "}
              {rating.toFixed(1)}({votes} votes)
            </p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
