import { LandingSongCard } from "@/components/SongCard";
import { Shield, Users, Smartphone, Heart } from "lucide-react";
import Image from "next/image";

export default function Features() {
  const dummySong = {
    name: "Love Yourself",
    artists: "Justin Bieber",
    album: "Purpose",
    albumArt: "https://ik.imagekit.io/kenma/image.png?updatedAt=1754581695541",
    spotifyUrl:
      "https://open.spotify.com/track/50kpGaPAhYJ3sGmk6vplg0?si=d32b7a8c04d049aa",
  };

  return (
    <div className="mx-4 mt-20 sm:m-20 md:m-30 md:mb-20 h-fit md:h-screen xl:max-h-[530px] max-w-[1400px]">
      <div
        className="grid gap-4 h-full
        md:grid-cols-2 md:grid-rows-6
        xl:grid-cols-3 xl:grid-rows-4"
      >
        {/* Title */}
        <div className="order-1 md:col-start-1 md:row-start-1 w-full max-w-full xl:max-w-[400px] text-6xl xl:text-7xl text-center sm:text-start sm:self-end text-black pb-4 font-medium">
          Features
        </div>

        {/* Social Song Suggestions */}
        <div className="order-2 md:col-start-1 md:row-start-2 md:row-span-3 xl:col-start-1 xl:row-start-2 xl:row-span-3 max-h-[390px]">
          <FeatureCard
            icon={<Users size={80} className="text-blue-600" />}
            title="Social Song Suggestions"
            bg="from-blue-50 to-indigo-100"
          >
            <p className="text-gray-700 text-sm leading-relaxed">
              Share your favorite tracks with the community and discover new
              music through peer recommendations.
            </p>
            <Image
              src="https://ik.imagekit.io/kenma/suggestsong.png?updatedAt=1754582315124"
              alt="suggest"
              width={742}
              height={872}
              className="w-full mt-4 rounded-3xl"
            />
          </FeatureCard>
        </div>

        {/* Secure Authentication */}
        <div className="order-3 md:col-start-2 md:row-start-5 md:row-span-2 xl:col-start-2 xl:row-start-1 xl:row-span-2 max-h-[300px]">
          <FeatureCard
            icon={<Shield size={60} className="text-green-600" />}
            title="Secure Authentication"
            bg="from-green-50 to-emerald-100"
          >
            <Image
              src="https://ik.imagekit.io/kenma/auth.png?updatedAt=1754579737091"
              alt="auth"
              width={539}
              height={825}
              className="w-full mt-4 rounded-3xl"
            />
          </FeatureCard>
        </div>

        {/* Mobile-Friendly Design */}
        <div className="order-4 md:col-start-1 md:row-start-5 xl:col-start-2 xl:row-start-4">
          <FeatureCard
            icon={<Smartphone size={60} className="text-purple-600" />}
            title="Mobile-Friendly Design"
            bg="from-purple-50 to-violet-100"
          >
            <div className="flex space-x-1">
              <div className={`w-4 h-6 bg-purple-200 rounded-sm`}></div>
              <div className={`w-4 h-6 bg-purple-300 rounded-sm`}></div>
              <div className={`w-4 h-6 bg-purple-400 rounded-sm`}></div>
            </div>
          </FeatureCard>
        </div>

        {/* Community Feed */}
        <div className="order-5 md:col-start-1 md:row-start-6 xl:col-start-2 xl:row-start-3">
          <FeatureCard
            icon={<Heart size={60} className="text-orange-600" />}
            title="Explore First, Join Later"
            bg="from-orange-50 to-amber-100"
          >
            <div className="flex -space-x-2">
              <div
                className={`w-8 h-8 bg-red-400 rounded-full border-2 border-white`}
              ></div>
              <div
                className={`w-8 h-8 bg-blue-400 rounded-full border-2 border-white`}
              ></div>
              <div
                className={`w-8 h-8 bg-emerald-400 rounded-full border-2 border-white`}
              ></div>
            </div>
          </FeatureCard>
        </div>

        {/* Landing Song Card */}
        <div className="order-6 md:col-start-2 md:row-start-1 md:row-span-4 xl:col-start-3 xl:row-start-1 xl:row-span-4 w-full">
          <LandingSongCard song={dummySong} />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, children, bg }) {
  return (
    <div
      className={`p-6 bg-gradient-to-br ${bg} border-0 rounded-3xl hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full`}
    >
      <div className="absolute top-2 right-2 opacity-10">{icon}</div>
      <div className="relative z-10 h-full flex flex-col justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

