"use client";

import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="p-4 flex items-center justify-center absolute w-full z-100">
      <div className="w-full max-w-5xl bg-white/60 dark:bg-black/30 transition-all duration-300 border border-zinc-200 dark:border-zinc-700/60 rounded-3xl backdrop-blur-sm ">
        <div className="flex items-center justify-between px-4 py-2 sm:py-3">
          <div className="flex items-center space-x-2">
            <Image
              src="/tuneticlogo.png"
              alt="tunetic logo"
              height={30}
              width={30}
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-white select-none">
              Tunetic
            </span>
          </div>

          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            <ThemeToggle />

            {session?.user && (
              <div className="relative">
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition border border-zinc-300 dark:border-zinc-700"
                >
                  <Image
                    src={session.user.image}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <ChevronDown className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                </button>

                {open && (
                  <div className="w-40 bg-white dark:bg-zinc-950 border dark:border-zinc-800 rounded-xl absolute right-0 mt-2  shadow z-50">
                    <div className="px-4 py-2 text-[16px] text-zinc-700 dark:text-zinc-300">
                      @
                      {session.user.username ||
                        session.user.name?.split(" ")[0]}
                    </div>
                    <hr className="border-zinc-200 dark:border-zinc-800" />
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left text-[16px] text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 px-4 py-2  rounded-b-xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
