"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import SuggestModal from "@/components/SuggestModal";
import Feed from "@/components/Feed";
import SkeletonCard from "@/components/SkeletonCard";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [suggestedSongs, setSuggestedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/suggest")
        .then((res) => res.json())
        .then((data) => {
          setSuggestedSongs(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch songs:", err);
          setLoading(false);
        });
    }
  }, [status]);

  const addSuggestedSong = (songData) => {
    setSuggestedSongs((prev) => [songData, ...prev]);
  };

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <>
      <Header onOpenSuggest={() => setIsSuggestOpen(true)} />
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors pt-26 w-full flex flex-col items-center px-4">
        <div className="max-w-5xl w-full flex flex-col gap-8 z-20">
          <section className="w-full">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
              Song Feed
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-8 sm:px-4 md:px-0 w-full">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <Feed suggestedSongs={suggestedSongs} />
            )}
          </section>
        </div>
      </div>

      {isSuggestOpen && (
        <SuggestModal
          onClose={() => setIsSuggestOpen(false)}
          onSuggest={addSuggestedSong}
        />
      )}
    </>
  );
}
