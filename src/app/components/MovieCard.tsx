"use client";

import { motion } from "framer-motion";
import type { Movie } from "../lib/tmdb";
import Link from "next/link";

const getRatingColor = (score: number) => {
  if (score >= 8) return "bg-green-500";
  if (score >= 6) return "bg-yellow-400";
  return "bg-red-500";
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png"; // fallback img

  // rating & votes fallback
  const rating = movie.vote_average ?? 0;
  const votes = movie.vote_count ?? 0;

  return (
    <Link href={`/movie/${movie.id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-[0_0_20px_#00f2ff]"
      >
        {/* ⭐ TMDB Rating Badge */}
        <div
          className={`absolute top-2 left-2 ${getRatingColor(
            rating
          )} text-black text-xs font-bold px-2 py-1 rounded-md shadow-md z-10`}
        >
          ⭐ {rating.toFixed(1)}
        </div>

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
            {movie.release_date?.slice(0, 4) || "Unknown"} • ⭐ {rating.toFixed(1)} ({votes} votes)
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
