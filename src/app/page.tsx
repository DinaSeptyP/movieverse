import Image from "next/image";
import SearchBar from "./components/SearchBar";
import MovieSection from "./components/MovieSection";
import Link from "next/link";
import MoodFilter from "@/app/components/MoodFilter";

const moods = [
  { emoji: "😎", name: "chill" },
  { emoji: "😂", name: "fun" },
  { emoji: "❤️", name: "romantic" },
  { emoji: "😭", name: "sad" },
  { emoji: "🤯", name: "mindblown" },
  { emoji: "👻", name: "spooky" },
];

export default function Home() {
  return (
    <div className="text-center space-y-10">
      <h1 className="text-4xl font-bold text-cyan-400">
        Welcome to MovieVerse ✨
      </h1>
      <p className="text-gray-400">
        Search and explore movies powered by TMDb API 🚀
      </p>

      <SearchBar />

      <p className="text-gray-400 mb-6">
        Select a mood below to discover matching movies!
      </p>
      <MoodFilter />

      {/* CONTENT SECTIONS */}
      <div className="space-y-12 max-w-7xl mx-auto">
        <MovieSection title="🔥 Trending Today" type="trending" />
        <MovieSection title="🚀 Popular Movies" type="popular" />
        <MovieSection title="⭐ Top Rated" type="top_rated" />
      </div>
    </div>
  );
}
