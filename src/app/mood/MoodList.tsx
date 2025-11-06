// src/app/mood/MoodList.tsx
"use client";
import Link from "next/link";

const moods = [
  { emoji: "😎", name: "chill" },
  { emoji: "😂", name: "fun" },
  { emoji: "❤️", name: "romantic" },
  { emoji: "😭", name: "sad" },
  { emoji: "🤯", name: "mindblown" },
  { emoji: "👻", name: "spooky" },
];

export default function MoodList() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {moods.map((m) => (
        <Link
          key={m.name}
          href={`/mood/${m.name}`}
          className="neon-border px-5 py-3 rounded-lg text-xl font-bold text-cyan-300 hover:text-pink-400 transition"
        >
          {m.emoji} {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
        </Link>
      ))}
    </div>
  );
}
