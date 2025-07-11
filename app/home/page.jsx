"use client";

import { useEffect, useState } from "react";
import Suggest from "@/components/Suggest";
import Feed from "@/components/Feed";

export default function Page() {
  const [suggestedSongs, setSuggestedSongs] = useState([]);

  // Load songs on mount
  useEffect(() => {
    const saved = localStorage.getItem("SuggestedSongs");
    if (saved) setSuggestedSongs(JSON.parse(saved));
  }, []);

  // Function to add new song to Feed
  const addSuggestedSong = (songData) => {
    const updated = [songData, ...suggestedSongs];
    setSuggestedSongs(updated);
    localStorage.setItem("SuggestedSongs", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors pt-24 w-full flex flex-col items-center px-4">
      <div className="max-w-5xl w-full flex flex-col items-center gap-6 z-20">
        <Suggest onSuggest={addSuggestedSong} />
        <Feed suggestedSongs={suggestedSongs} />
      </div>
    </div>
  );
}
