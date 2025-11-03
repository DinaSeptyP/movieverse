"use client";
import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/157336?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  }, []);

  return <div className="text-white">Testing fetch...</div>;
}
