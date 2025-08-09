"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative min-h-[800px] max-w-[1400px] w-full flex justify-center items-center p-4 sm:p-8">
      <div className="z-10 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-[80px] mb-4 font-medium">
          Find the <span className="font-bold">Beat</span>
          <br /> Everyone’s Tuning Into
        </h1>
        <h2 className="text-lg sm:text-2xl mb-8 text-white/80">
          Suggest songs, browse the live feed, and vibe together.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login">
            <button className="shine-btn bg-emerald-500 hover:bg-emerald-600 text-white text-xl md:text-2xl font-medium px-8 py-3 rounded-4xl shadow-md transition-all duration-200 cursor-pointer border border-emerald-500">
              Join the Vibe
            </button>
          </Link>

          <Link href="/feed">
            <button className="shine-btn bg-zinc-200/10 hover:bg-zinc-200/30 border border-white/30 text-white text-xl md:text-2xl font-medium px-8 py-3 rounded-4xl backdrop-blur-md cursor-pointer">
              Explore Feed
            </button>
          </Link>
        </div>
      </div>
      <Image
        src="https://ik.imagekit.io/kenma/1000168209.jpg?updatedAt=1754557549304"
        alt="Background"
        fill
        className="object-cover rounded-b-4xl sm:rounded-4xl absolute z-0"
      />
      <h2 className="text-2xl absolute z-50 top-5 left-[50%] transform -translate-x-1/2 animate-pulse">
        Tunetic
      </h2>
      <style jsx global>{`
        .shine-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .shine-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 150%;
          height: 100%;
          background: linear-gradient(
            130deg,
            rgba(255, 255, 255, 0) 45%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 55%
          );
          transform: skewX(-20deg);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .shine-btn:hover::before {
          opacity: 1;
          animation: shine-sweep 1.2s ease-in-out forwards;
        }

        @keyframes shine-sweep {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
