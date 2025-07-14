"use client";
import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import Suggest from "./Suggest";

export default function SuggestModal({ onClose, onSuggest }) {
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm pt-20 flex items-start justify-center ">
      <div
        ref={modalRef}
        className="bg-white dark:bg-zinc-900  rounded-2xl p-6 w-full max-w-xl shadow-xl animate-modalEnter mx-4 sm:mx-0 border border-zinc-200 dark:border-zinc-700" 
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
            Suggest a Song
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition rounded-full border border-zinc-300 dark:border-zinc-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Suggest inputRef={inputRef} onSuggest={onSuggest} onDone={onClose} />
      </div>
    </div>
  );
}
