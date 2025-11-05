export default function Footer() {
  return (
    <footer className="mt-20 border-t border-cyan-500/30 pt-8 pb-6 text-center text-gray-400">
      <p className="text-sm opacity-80 mb-2">
        🎬 Built with ❤️ & ⚡ by MovieVerse
      </p>

      <div className="flex items-center justify-center gap-4 text-xs text-cyan-400">
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          className="hover:text-pink-400 transition font-semibold"
          rel="noreferrer"
        >
          Powered by TMDB API
        </a>
        <span className="text-gray-500">•</span>
        <a
          href="https://github.com/DinaSeptyP"
          target="_blank"
          className="hover:text-pink-400 transition"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        *Movie data & posters courtesy of TMDB.
        <br />
        Not affiliated with TMDB.
      </p>
    </footer>
  );
}
