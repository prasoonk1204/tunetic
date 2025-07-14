"use client";
import { useState, useEffect, useRef } from "react";

export default function Suggest({ onSuggest, inputRef, onDone }) {
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

  const handleSuggest = async () => {
    if (!selectedSong) return;

    const songData = {
      name: selectedSong.name,
      album: selectedSong.album.name,
      albumArt: selectedSong.album.images[0]?.url || "",
      artists: selectedSong.artists.map((a) => a.name).join(", "),
      spotifyUrl: selectedSong.external_urls.spotify,
    };

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(songData),
      });

      if (res.status === 409) {
        alert("You already suggested this song.");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to suggest song");
      }

      const savedSong = await res.json();

      if (typeof onSuggest === "function") onSuggest(savedSong);
      if (typeof onDone === "function") onDone();

      setQuery("");
      setResults([]);
      setSelectedSong(null);
      setShowDropdown(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-5xl relative" ref={containerRef}>
      <input
        type="text"
        placeholder="Type song name..."
        className="w-full h-10 px-4 py-6 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100/40 dark:bg-zinc-900/70 focus:outline-none focus:border-emerald-500/60  text-zinc-900 dark:text-zinc-100"
        value={query}
        ref={inputRef}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedSong(null);
        }}
        onFocus={() => setShowDropdown(true)}
      />

      {showDropdown && results.length > 0 && (
        <ul className="mt-2 left-0 w-full flex flex-col gap-2 overflow-hidden transition-all duration-300">
          {results.map((track, index) => {
            const isSelected = selectedSong?.id === track.id;
            return (
              <li
                key={track.id}
                style={{ animationDelay: `${index * 60}ms` }}
                className={`animate-fade-in-up relative flex items-center justify-between gap-4 p-3 backdrop-blur-2xl transition-all cursor-pointer border group rounded-2xl ${
                  isSelected
                    ? "bg-emerald-100/50 dark:bg-emerald-900/40 border-emerald-400 "
                    : "bg-white/80 dark:bg-black/80 border-zinc-300 dark:border-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-900/80"
                }`}
                onClick={() => setSelectedSong(isSelected ? null : track)}
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
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-1.5 rounded-lg shadow transition"
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
  );
}
