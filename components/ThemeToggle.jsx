'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`p-2 transition-colors duration-200 rounded-full border border-zinc-300 dark:border-zinc-700 hover:cursor-pointer ${
        isDark
          ? "text-zinc-300 hover:text-white hover:bg-zinc-200/20"
          : "text-zinc-700 hover:text-black hover:bg-zinc-500/20"
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
