"use client";

import { Music2, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Header({ onOpenSuggest }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="p-4 flex items-center justify-center fixed w-full top-0 z-[100]">
      <div className="w-full max-w-8xl bg-white/60 dark:bg-black/30 transition-all duration-300 border border-zinc-200 dark:border-zinc-700/60 rounded-3xl backdrop-blur-sm ">
        <div className="flex items-center justify-between px-4 py-3">
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
            {pathname !== "/" && pathname !== "/login" && (
              <button
                onClick={onOpenSuggest}
                className="p-2 rounded-full hover:bg-emerald-200/70 dark:hover:bg-emerald-500 border border-emerald-400 transition"
                title="Suggest a song"
              >
                <Music2 className="h-5 w-5 text-black dark:text-white hover:text-black" />
              </button>
            )}

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
                  <div className="w-40 bg-white dark:bg-zinc-950 border dark:border-zinc-800 rounded-xl absolute right-0 mt-2 shadow z-50">
                    <div className="text-[16px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                      <Link href={`/user/${session.user.username}`} className="px-4 py-2 block">
                        @
                        {session.user.username ||
                          session.user.name?.split(" ")[0]}
                      </Link>
                    </div>

                    <hr className="border-zinc-200 dark:border-zinc-800" />
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left text-[16px] text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 px-4 py-2 rounded-b-xl"
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
