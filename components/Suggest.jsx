"use client";
import { useState, useEffect, useRef } from "react";

export default function Suggest({ onSuggest }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // Debounce query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 800);
    return () => clearTimeout(timeout);
  }, [query]);

  // Fetch search results
  useEffect(() => {
    const fetchSongs = async () => {
      if (!debouncedQuery) return setResults([]);

      try {
        setLoading(true);
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Error fetching songs:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggest = () => {
    if (!selectedSong) return;

    const user = localStorage.getItem("User") || "Unknown";
    const songData = {
      name: selectedSong.name,
      album: selectedSong.album.name,
      albumArt: selectedSong.album.images[0]?.url || "",
      artists: selectedSong.artists.map((a) => a.name).join(", "),
      spotifyUrl: selectedSong.external_urls.spotify,
      user,
    };

    const existing = JSON.parse(localStorage.getItem("SuggestedSongs") || "[]");
    const updated = [songData, ...existing];
    localStorage.setItem("SuggestedSongs", JSON.stringify(updated));

    if (typeof onSuggest === "function") {
      onSuggest?.(songData);
    }

    setQuery("");
    setResults([]);
    setSelectedSong(null);
    setShowDropdown(false);
  };
  

  return (
    <div
      className="w-full max-w-5xl p-4 bg-white dark:bg-zinc-900/60 rounded-3xl shadow-md relative border border-zinc-200 dark:border-zinc-800/80 transition-all dark:shadow-[inset_0px_-2px_4px_rgba(255,255,255,0.1)]"
      ref={containerRef}
    >
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
        Suggest a song
      </h2>

      <div className="relative">
        <input
          type="text"
          placeholder="Type song name..."
          className="w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100/70 dark:bg-zinc-800/70 focus:outline-none focus:ring-1 focus:ring-emerald-500/60"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedSong(null);
          }}
          onFocus={() => setShowDropdown(true)}
        />

        {showDropdown && results.length > 0 && (
          <ul className="absolute z-50 top-full mt-2 left-0 w-full overflow-y-auto animate-fade-slide">
            {results.map((track) => {
              const isSelected = selectedSong?.id === track.id;
              return (
                <li
                  key={track.id}
                  onClick={() => setSelectedSong(isSelected ? null : track)}
                  className={`relative flex items-center justify-between gap-4 p-3 backdrop-blur-2xl transition-all cursor-pointer border group rounded-xl ${
                    isSelected
                      ? "bg-emerald-100/50 dark:bg-emerald-900/40 border-emerald-400 "
                      : "bg-white/80 dark:bg-black/80 border-zinc-200 dark:border-zinc-900 hover:bg-zinc-200/80 dark:hover:bg-zinc-900/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        track.album.images[2]?.url || track.album.images[0]?.url
                      }
                      alt={track.name}
                      className="w-10 h-10 rounded-lg object-cover shadow-sm"
                    />
                    <div className="text-sm flex flex-col">
                      <span className="font-medium text-zinc-800 dark:text-white">
                        {track.name}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {track.artists.map((a) => a.name).join(", ")}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSuggest();
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-1.5 rounded-md shadow transition"
                    >
                      Suggest
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
