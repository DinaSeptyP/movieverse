import Image from "next/image";
import { getMovieDetail, getMovieCredits, getMovieVideos } from "@/app/lib/tmdb";
import BackButton from "@/app/components/BackButton";

export default async function MovieDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const movie = await getMovieDetail(id);
  const credits = await getMovieCredits(id);
  const videos = await getMovieVideos(id);

  const cast = credits.cast?.slice(0, 10);
  const trailer = videos.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="relative min-h-screen pb-12">

      {/* Background Blur */}
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="bg"
        fill
        className="object-cover opacity-30 blur-2xl -z-10"
      />

      {/* Gradient overlay biar teks jelas */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/70 to-black -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-6">

        <BackButton />

        <div className="grid md:grid-cols-3 gap-10 mt-8">

          {/* Poster */}
          <div className="relative w-full h-[480px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:col-span-2 text-white space-y-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <p className="text-gray-300 text-sm">
              ⭐ <span className="font-bold">{movie.vote_average.toFixed(1)}</span>/10 • {movie.vote_count} votes
            </p>

            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((g: any) => (
                <span
                  key={g.id}
                  className="bg-white/15 px-3 py-1 rounded-full text-sm text-gray-200 backdrop-blur-md"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 pt-2">
              🗓 <span className="font-medium">{movie.release_date}</span>
            </p>

            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                className="mt-5 inline-block px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium shadow-lg"
              >
                Visit Official Site
              </a>
            )}
          </div>
        </div>

        {/* Cast */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Cast</h2>

          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {cast?.map((actor: any) => (
              <div key={actor.id} className="w-24 md:w-28 text-center snap-start">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "/no-profile.png"
                  }
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border border-white/20 shadow"
                />
                <p className="text-xs text-gray-200 mt-1 font-semibold truncate">
                  {actor.name}
                </p>
                <p className="text-[10px] text-gray-400 truncate">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trailer */}
        {trailer && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Trailer</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/20 shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
