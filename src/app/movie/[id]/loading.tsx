"use client";

export default function LoadingMovie() {
  return (
    <div className="text-white flex justify-center items-center h-screen">
      <div className="animate-pulse text-xl font-semibold opacity-70">
        Loading movie details...
      </div>
    </div>
  );
}
