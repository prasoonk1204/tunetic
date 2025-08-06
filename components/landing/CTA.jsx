import Image from "next/image"
import Link from "next/link";

export default function CTA(){
    return (
      <div className="relative h-[70vh] m-4 sm:m-16 lg:m-30 flex justify-center items-center">
        <div className="z-10 text-center p-8 sm:p-20">
          <h1 className="text-5xl md:text-7xl mb-8">
            Drop tracks. Discover others. Vibe together.
          </h1>
          <Link href="/login">
            <button className="bg-white text-black hover:scale-103 px-6 sm:px-12 py-2 sm:py-3 rounded-4xl transition-all duration-200 cursor-pointer text-lg sm:text-2xl">
              Tune in Now
            </button>
          </Link>
        </div>
        <Image
          src="https://ik.imagekit.io/kenma/Ultravibe20-2002_optimized.png?updatedAt=1754489401450"
          alt="Background"
          fill
          className="object-cover rounded-3xl absolute z-0 "
        />
      </div>
    );
}