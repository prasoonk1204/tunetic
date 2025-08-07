"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/feed");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 w-full relative bg-white dark:bg-black">
      <div
        className="absolute inset-0 z-0 block dark:hidden"
        style={{
          backgroundImage: `
    radial-gradient(circle at 50% 120%, rgba(16, 185, 129, 0.5) 0%, transparent 60%),
    radial-gradient(circle at 50% 120%, rgba(5, 150, 105, 0.4) 0%, transparent 70%),
    radial-gradient(circle at 50% 120%, rgba(110, 231, 183, 0.3) 0%, transparent 80%)
  `,
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `
    radial-gradient(circle at 50% 130%, rgba(16, 185, 129, 0.5) 0%, transparent 60%),
    radial-gradient(circle at 50% 130%, rgba(5, 150, 105, 0.4) 0%, transparent 70%),
    radial-gradient(circle at 50% 130%, rgba(110, 231, 183, 0.3) 0%, transparent 80%)
  `,
        }}
      />
      <Header />
      <div className="w-full max-w-[420px] p-8 rounded-4xl backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-900/80 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <Image
            src="/tuneticlogo.png"
            alt="Tunetic Logo"
            width={50}
            height={50}
          />
        </div>

        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
          Login to <span className="text-emerald-500">Tunetic</span>
        </h1>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Discover music, suggest songs, and vibe with the community.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 border bg-white dark:bg-zinc-700/70 text-zinc-800 dark:text-white border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm transition hover:cursor-pointer"
          >
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            <span className="font-medium text-[16px]">
              Continue with Google
            </span>
          </button>

          <button
            onClick={() => signIn("twitter")}
            className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 border border-black bg-black text-white hover:bg-zinc-900 shadow-sm transition hover:cursor-pointer"
          >
            <Image src="/x-icon.png" alt="X" width={20} height={20} />
            <span className="font-medium text-[16px]">Continue with X</span>
          </button>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-2">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
