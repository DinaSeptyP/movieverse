export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

interface TMDBResponse {
  results: Movie[];
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Failed to fetch movies");

  const data: TMDBResponse = await res.json();

  return data.results;
}

export async function getMovieDetail(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!res.ok) {
    console.error("TMDB Error:", await res.text());
    throw new Error("Failed to fetch movie");
  }

  return res.json();
}

// Get cast
export async function getMovieCredits(id: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;

  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}

// Get trailers / videos
export async function getMovieVideos(id: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;

  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}