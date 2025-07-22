"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import DropdownPortal from "@/components/DropdownPortal";
import { useRouter } from "next/navigation";

export default function SongCard({ song, hideUsername = false }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveringTrigger, setHoveringTrigger] = useState(false);
  const [hoveringDropdown, setHoveringDropdown] = useState(false);
  const buttonRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let timeout;
    if (!hoveringTrigger && !hoveringDropdown && !isMobile) {
      timeout = setTimeout(() => setShowDropdown(false), 250);
    }
    return () => clearTimeout(timeout);
  }, [hoveringTrigger, hoveringDropdown, isMobile]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showDropdown &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        !e.target.closest(".dropdown-portal")
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleDropdownToggle = () => {
    if (isMobile) setShowDropdown((prev) => !prev);
  };

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

        {!hideUsername &&
          Array.isArray(song.suggestedBy) &&
          song.suggestedBy.length > 0 && (
            <div className="relative mt-2 z-10 text-sm">
              <span>Suggested by: </span>

              {song.suggestedBy.length === 1 ? (
                <Link
                  href={`/user/${song.suggestedBy[0].username}`}
                  className="relative inline-block text-emerald-700 dark:text-emerald-400 font-mono italic before:content-[''] before:absolute before:-bottom-[2px] before:left-0 before:w-0 before:h-[1px] before:bg-emerald-500 dark:before:bg-emerald-400 hover:before:w-full before:transition-all before:duration-300 text-[15px]"
                >
                  @{song.suggestedBy[0].username}
                </Link>
              ) : (
                <>
                  <Link
                    href={`/user/${song.suggestedBy[0].username}`}
                    className="relative inline-block text-emerald-700 dark:text-emerald-400 font-mono italic before:content-[''] before:absolute before:-bottom-[2px] before:left-0 before:w-0 before:h-[1px] before:bg-emerald-500 dark:before:bg-emerald-400 hover:before:w-full before:transition-all before:duration-300 text-[15px]"
                  >
                    @{song.suggestedBy[0].username}
                  </Link>

                  <span
                    ref={buttonRef}
                    className="ml-1 text-zinc-600 dark:text-zinc-300 cursor-pointer italic"
                    onClick={() => {
                      if (isMobile) setShowDropdown((prev) => !prev);
                    }}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setHoveringTrigger(true);
                        setShowDropdown(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) setHoveringTrigger(false);
                    }}
                  >
                    +{song.suggestedBy.length - 1} more
                  </span>

                  <DropdownPortal
                    targetRef={buttonRef}
                    open={showDropdown}
                    onHoverChange={setHoveringDropdown}
                    position="right"
                  >
                    <ul className="animate-fade-in bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 rounded-md px-4 py-2 shadow-lg w-max text-sm z-50 backdrop-blur-lg space-y-2">
                      {song.suggestedBy.slice(1).map((user, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/user/${user.username}`}
                            className="relative block text-emerald-600 dark:text-emerald-400 cursor-pointer before:content-[''] before:absolute before:-bottom-[2px] before:left-0 before:w-0 before:h-[1px] before:bg-emerald-500 dark:before:bg-emerald-400 hover:before:w-full before:transition-all before:duration-300 italic"
                            onClick={() => setShowDropdown(false)}
                          >
                            @{user.username}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </DropdownPortal>
                </>
              )}
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
