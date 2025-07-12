"use client";


import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-center overflow-hidden absolute w-full">
      <div
        className="w-full max-w-5xl rounded-3xl backdrop-blur-sm bg-white/60 dark:bg-black/30 transition-all duration-300 border border-zinc-200 dark:border-zinc-700/60"
      >
        <div className="flex items-center justify-between px-4 py-4 sm:py-4">
          <div className="flex items-center space-x-2">
            <Image src="/tuneticlogo.png" alt="tunetic logo" height={30} width={30} />
            <span className="text-lg font-semibold text-gray-900 dark:text-white select-none">
              Tunetic
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
