"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Suggest from "@/components/Suggest";
import Feed from "@/components/Feed";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [suggestedSongs, setSuggestedSongs] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      const saved = localStorage.getItem("SuggestedSongs");
      if (saved) setSuggestedSongs(JSON.parse(saved));
    }
  }, [status]);

  const addSuggestedSong = (songData) => {
    const updated = [songData, ...suggestedSongs];
    setSuggestedSongs(updated);
    localStorage.setItem("SuggestedSongs", JSON.stringify(updated));
  };

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors pt-24 w-full flex flex-col items-center px-4">
      <div className="max-w-5xl w-full flex flex-col items-center gap-6 z-20">
        <Suggest onSuggest={addSuggestedSong} />
        <Feed suggestedSongs={suggestedSongs} />
      </div>
    </div>
  );
}
