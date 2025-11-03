import Image from "next/image";
import SearchBar from "./components/SearchBar";

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
    </div>
  );
}
