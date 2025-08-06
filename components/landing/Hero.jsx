import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-screen m-4 sm:m-8 flex justify-center items-center p-4 sm:p-8">
      <div className="z-10 text-center mt-15 sm:mt-0">
        <h1 className="text-5xl sm:text-[80px] mb-8 sm:mb-4">
          Find the <span className="font-medium">Beat</span>
          <br /> Everyone’s Tuning Into
        </h1>
        <h2 className="text-lg sm:text-2xl mb-8 text-white/80">
          Suggest songs, browse the live feed, and vibe together.
        </h2>
        <Link href="/login">
          <button className="bg-emerald-500 hover:bg-emerald-400 hover:scale-103 px-6 sm:px-12 py-2 sm:py-3 rounded-4xl transition-all duration-200 cursor-pointer text-lg sm:text-2xl shadow-[inset_0_-2px_4px_rgba(255,255,255,0.5)] font-medium">
            Join the Vibe
          </button>
        </Link>
      </div>
      <Image
        src="https://ik.imagekit.io/kenma/IMG_20250806_234427.jpg?updatedAt=1754504184673"
        alt="Background"
        fill
        className="object-cover rounded-4xl absolute z-0"
      />
      <h2 className="text-2xl absolute z-50 top-5 left-[50%] transform -translate-x-1/2">
        Tunetic
      </h2>
    </div>
  );
}
