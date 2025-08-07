"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import SuggestModal from "@/components/SuggestModal";
import Feed from "@/components/Feed";
import SkeletonCard from "@/components/SkeletonCard";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  const [suggestedSongs, setSuggestedSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  const fetchSongs = async (pageNum = 1) => {
    const limit = 12;
    const skip = (pageNum - 1) * limit;

    setLoading(true);
    try {
      const res = await fetch(`/api/suggest?skip=${skip}&limit=${limit}`);
      const data = await res.json();

      if (data.songs.length === 0) {
        setHasMore(false);
      } else {
        setSuggestedSongs((prev) => [...prev, ...data.songs]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Failed to fetch songs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs(1);
  }, []);

  const observer = useRef(null);
  const lastSongRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchSongs(page);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );

  const addSuggestedSong = (songData) => {
    setSuggestedSongs((prev) => [songData, ...prev]);
  };

  const handleOpenSuggest = () => {
    if (!session) {
      router.push("/login");
    } else {
      setIsSuggestOpen(true);
    }
  };

  return (
    <>
      <Header onOpenSuggest={handleOpenSuggest} />
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors pt-26 w-full flex flex-col items-center px-4">
        <div className="max-w-5xl w-full flex flex-col gap-8 z-20">
          <section className="w-full">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">
              What Everyone’s Vibin’ To
            </h2>

            <Feed
              suggestedSongs={suggestedSongs}
              lastSongRef={lastSongRef}
              showLoading={loading}
            />

            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8 sm:px-4 md:px-0 w-full mt-4">
                {[...Array(12)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {isSuggestOpen && session && (
        <SuggestModal
          onClose={() => setIsSuggestOpen(false)}
          onSuggest={addSuggestedSong}
        />
      )}
    </>
  );
}
