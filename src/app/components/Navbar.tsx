"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="glass fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-screen px-6 py-3 rounded-2xl flex justify-between items-center border border-white/20 bg-white/10 backdrop-blur-lg shadow-lg z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link href="/" className="text-cyan-300 font-bold text-lg tracking-wide">
        MovieVerse ✦
      </Link>

      <div className="flex gap-6 text-sm">
        <Link className="hover:text-cyan-300 transition" href="/favorites">
          ❤️ Favorites
        </Link>
        <Link className="hover:text-cyan-300 transition" href="/watchlist">
          🎥 Watchlist
        </Link>
      </div>
    </motion.nav>
  );
}
