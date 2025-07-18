import Link from "next/link";

export default function SongCard({ song, hideUsername = false }) {
  return (
    <div className="relative rounded-4xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-gradient-to-b from-zinc-300 to-zinc-50 dark:from-zinc-800 dark:to-black dark:text-white mx-auto h-100 shadow-md hover:shadow-xl transition-all duration-300 w-full">
      <img
        src={song.albumArt}
        alt={song.name}
        className="w-full object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-white/80 via-white/65 to-white/50 dark:from-black/40 dark:via-black/60 dark:to-black/80 backdrop-blur-md text-zinc-900 dark:text-zinc-300 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-4px_8px_rgba(255,255,255,0.2)]">
        <div className="font-bold text-xl dark:text-white">{song.name}</div>
        <div className="text-[16px]">{song.artists}</div>
        <div className="text-sm">Album: {song.album}</div>
        {!hideUsername && (
          <div className="text-sm mt-1">
            Suggested by:{" "}
            <Link
              href={`/user/${song.username}`}
              className="relative inline-block text-emerald-700 dark:text-emerald-400 transition-colors duration-200 hover:text-emerald-600 dark:hover:text-emerald-500 font-mono font-semibold"
            >
              <span className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                @{song.username || "Unknown"}
              </span>
            </Link>
          </div>
        )}

        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white text-[17px] hover:text-sm font-medium py-3 rounded-2xl transition-all duration-200 shadow-md"
        >
          Listen on Spotify
        </a>
      </div>
    </div>
  );
}
