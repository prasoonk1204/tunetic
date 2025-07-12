export default function SongCard({ song }) {
    return (
      <div className="relative rounded-4xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-gradient-to-b from-zinc-300 to-zinc-50 dark:from-zinc-800 dark:to-black dark:text-white mx-auto h-100 shadow-md hover:shadow-xl transition-all duration-300 w-full">
        <img
          src={song.albumArt}
          alt={song.name}
          className="w-full object-cover "
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-white/80 via-white/65 to-white/50 dark:from-black/40 dark:via-black/60 dark:to-black/80 backdrop-blur-md text-zinc-900 dark:text-zinc-300 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_-4px_8px_rgba(255,255,255,0.2)]">
          <div className="font-bold text-xl dark:text-white">{song.name}</div>
          <div className="text-sm">{song.artists}</div>
          <div className="text-xs">Album: {song.album}</div>
          <div className="text-xs mt-1">Suggested by: {song.user}</div>

          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block w-full text-center bg-blue-500 hover:bg-blue-600 text-white text-[17px] hover:text-sm font-medium py-3 rounded-2xl transition-all duration-200 shadow-md"
          >
            Listen on Spotify
          </a>
        </div>
      </div>
    );
  }
  