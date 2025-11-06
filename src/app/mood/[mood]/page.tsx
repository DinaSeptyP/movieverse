import { getMoviesByGenre } from "@/app/lib/tmdb";
import { moodGenreMap } from "@/app/lib/moodGenres";
import MovieGrid from "@/app/components/MovieGrid";

interface MoodPageProps {
  params: Promise<{ mood: string }>;
}

export default async function MoodPage({ params }: MoodPageProps) {
  const { mood } = await params;

  const moodKey = mood.toLowerCase();
  const genres = moodGenreMap[moodKey];

  if (!genres) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl text-pink-400 font-bold">Mood not found 😢</h1>
      </div>
    );
  }

  const movies = await getMoviesByGenre(genres);

  return (
    <div className="max-w-7xl mx-auto text-center space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 mt-8 capitalize">
        {moodKey} Mood 🎬
      </h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
