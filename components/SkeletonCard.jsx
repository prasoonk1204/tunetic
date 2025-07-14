export default function SkeletonCard() {
  return (
    <div className="relative rounded-4xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 mx-auto h-100 w-full animate-pulse shadow-sm">
      <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-800" />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-white/80 via-white/65 to-white/50 dark:from-black/40 dark:via-black/60 dark:to-black/80 backdrop-blur-md shadow-[inset_0_-4px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-4px_8px_rgba(255,255,255,0.1)] space-y-2">
        <div className="h-5 w-3/4 bg-zinc-300 dark:bg-zinc-700/30 rounded"></div>
        <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-600/30 rounded"></div>
        <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-700/30 rounded"></div>
        <div className="h-3 w-1/3 bg-zinc-300 dark:bg-zinc-800/30 rounded"></div>
        <div className="mt-4 h-10 w-full bg-blue-300/70 dark:bg-blue-600/30 rounded-2xl" />
      </div>
    </div>
  );
}
