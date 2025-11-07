import MovieCard from "./MovieCard";
import type { Movie } from "@/app/lib/tmdb";
import { tmdb } from "@/app/lib/tmdb";

export default async function MovieSection({
  title,
  type = "trending",
}: {
  title: string;
  type?: "trending" | "popular" | "top_rated";
}) {
  let path = "";
  if (type === "trending") path = "/trending/movie/day";
  else if (type === "popular") path = "/movie/popular";
  else if (type === "top_rated") path = "/movie/top_rated";
  else path = "/movie/popular";

  let data: { results?: Movie[] } = { results: [] };

  try {
    data = await tmdb(path);
  } catch (err) {
    console.error("MovieSection tmdb error:", err);
    data = { results: [] };
  }

  const movies = data.results ?? [];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 neon-text">{title}</h2>

      {movies.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* skeleton placeholders (server-side simple) */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-xl bg-linear-to-r from-white/5 via-white/10 to-white/5 bg-size-[200%_100%] animate-shimmer"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
