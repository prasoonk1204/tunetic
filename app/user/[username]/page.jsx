"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SongCard from "@/components/SongCard";
import Header from "@/components/Header";
import SuggestModal from "@/components/SuggestModal";
import SkeletonCard from "@/components/SkeletonCard";

export default function UserProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user/${username}`);
        const data = await res.json();
        setUser(data.user);
        setSongs(data.songs);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const addSuggestedSong = (songData) => {
    setSongs((prev) => [songData, ...prev]);
  };

  return (
    <>
      <Header onOpenSuggest={() => setIsSuggestOpen(true)} />

      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors pt-2 w-full flex flex-col items-center px-4">
        <div className="max-w-5xl w-full flex flex-col gap-8 z-20 pt-24 pb-10">
          {loading ? (
            <>
              <SkeletonCard variant="profile" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8 sm:px-4 md:px-0">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
              </div>
            </>
          ) : !user ? (
            <div className="p-8 text-center">User not found.</div>
          ) : (
            <>
              <Link
                href="/feed"
                className="text-gray-500 dark:text-gray-400 text-[16px] md:text-lg h-2"
              >
                ←{" "}
                <span className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-gray-600 dark:hover:text-gray-500">
                  Back to Feed
                </span>
              </Link>

              <div className="rounded-4xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md shadow-md p-6 sm:p-8 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={64}
                    height={64}
                    className="rounded-full border border-zinc-300 dark:border-zinc-700"
                  />
                  <div>
                    <div className="text-2xl font-semibold text-zinc-900 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400 text-sm">
                      @{user.username}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-[16px]">
                  Total Songs Suggested:{" "}
                  <span className="font-semibold">{songs.length}</span>
                </p>
              </div>

              {songs.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400">
                  No suggestions yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8 sm:px-4 md:px-0">
                  {songs.map((song) => (
                    <SongCard key={song._id} song={song} hideUsername />
                  ))}
                </div>
              )}
            </>
          )}
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
