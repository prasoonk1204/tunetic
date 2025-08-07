"use client";
import SongCard from "./SongCard";

export default function Feed({ suggestedSongs, lastSongRef, showLoading }) {
  return (
    <div className="w-full max-w-5xl pb-4 space-y-4">
      {suggestedSongs && suggestedSongs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8 sm:px-4 md:px-0">
          {suggestedSongs.map((song, i) => {
            const isLast = i === suggestedSongs.length - 1;
            return (
              <div key={i} ref={isLast ? lastSongRef : null}>
                <SongCard song={song} />
              </div>
            );
          })}
        </div>
      ) : !showLoading ? (
        <div className="text-sm text-gray-500 dark:text-zinc-400 px-8">
          No suggestions yet.
        </div>
      ) : null}
    </div>
  );
}
