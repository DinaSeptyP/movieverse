"use client";

import { motion, AnimatePresence } from "framer-motion";

interface RecentSearchesProps {
  searches: string[];
  onClick: (search: string) => void;
  onClear: () => void;
}

export default function RecentSearches({
  searches,
  onClick,
  onClear,
}: RecentSearchesProps) {
  if (!searches?.length) return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>Recent searches</span>
        <button
          onClick={onClear}
          className="hover:text-pink-400 transition-colors duration-300"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        <AnimatePresence>
          {searches.map((search, i) => (
            <motion.button
              key={search}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -5 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              onClick={() => onClick(search)}
              className="relative group rounded-full px-4 py-1.5 text-sm font-medium
                         text-white bg-gray-800/50 backdrop-blur-sm border border-gray-700
                         hover:border-pink-500 hover:bg-gray-800/70 transition-all duration-300"
            >
              <span className="relative z-10">{search}</span>

              {/* 🔥 Neon glow effect */}
              <span
                className="absolute inset-0 rounded-full bg-linear-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30
                           opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
