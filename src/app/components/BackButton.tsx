"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur border border-white/20 transition"
    >
      ← Back
    </button>
  );
}
