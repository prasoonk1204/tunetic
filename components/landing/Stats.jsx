"use client";

import { useEffect, useState } from "react";
import { HeadphonesIcon, User2, TrendingUp } from "lucide-react";
import clsx from "clsx";

export default function Stats() {
  const [stats, setStats] = useState(null);

  const colorClasses = {
    "emerald-500": {
      text: "text-emerald-500",
      border: "border-emerald-500",
      from: "from-emerald-500/30",
    },
    "blue-500": {
      text: "text-blue-500",
      border: "border-blue-500",
      from: "from-blue-500/30",
    },
    "yellow-500": {
      text: "text-yellow-500",
      border: "border-yellow-500",
      from: "from-yellow-500/30",
    },
    "red-500": {
      text: "text-red-500",
      border: "border-red-500",
      from: "from-red-500/30",
    },
  };

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    }

    fetchStats();
  }, []);

  const skeleton = (
    <div className="grid sm:grid-cols-2 gap-8 z-10 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-700/20 p-4 rounded-3xl max-w-95 flex flex-col sm:flex-row gap-4 backdrop-blur-xl border-1 border-gray-700/30"
        >
          <div className="h-12 w-12 rounded-full bg-gray-600" />
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-600 rounded w-24" />
            <div className="h-6 bg-gray-600 rounded w-32" />
            <div className="h-3 bg-gray-600 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );

  const statCards = stats && [
    {
      title: "Active Vibers",
      value: stats.totalUsers,
      stat: "",
      icon: <User2 height={36} width={36} />,
      iconColor: "emerald-500",
    },
    {
      title: "Songs Shared",
      value: stats.totalSongs,
      stat: "",
      icon: <HeadphonesIcon height={36} width={36} />,
      iconColor: "blue-500",
    },
    {
      title: "Top Artist",
      value: stats.topArtist?.name || "N/A",
      stat: `${stats.topArtist?.count || 0} tracks picked`,
      icon: <User2 height={36} width={36} />,
      iconColor: "yellow-500",
    },
    {
      title: "Now Trending",
      value: stats.trending?.name || "N/A",
      stat: `Chosen ${stats.trending?.count || 0} times`,
      icon: <TrendingUp height={36} width={36} />,
      iconColor: "red-500",
    },
  ];

  return (
    <div className=" bg-black text-white mt-20 sm:mt-8 flex flex-col justify-center items-center p-10 py-20 sm:py-35 relative w-full">
      <h1 className="text-4xl sm:text-5xl mb-8 sm:mb-14 text-center z-10">
        What's Poppin' Right Now
      </h1>
      {stats ? (
        <div className="grid sm:grid-cols-2 gap-8 z-10 text-center sm:text-start">
          {statCards.map((stat, index) => {
            const color = colorClasses[stat.iconColor];

            return (
              <div
                key={index}
                className="bg-gray-700/20 p-4 rounded-3xl max-w-95 flex flex-col sm:flex-row gap-4 backdrop-blur-xl border-1 border-gray-700/30"
              >
                  <div
                    className={clsx(
                      "border-t-1 p-3 rounded-full h-full bg-gradient-to-b flex justify-center items-center animate-pulse",
                      color.text,
                      color.border,
                      color.from
                    )}
                  >
                    {stat.icon}
                  </div>

                <div>
                  <h2 className="sm:text-lg">{stat.title}</h2>
                  <p
                    className="text-3xl sm:text-4xl mb-4 font-medium"
                    title={stat.value}
                  >
                    {typeof stat.value === "string" && stat.value.length > 25
                      ? stat.value.slice(0, 25) + "..."
                      : stat.value}
                  </p>
                  {stat.stat && <span className="text-sm">{stat.stat}</span>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        skeleton
      )}
      <div
        className="absolute h-80 w-80 z-0 rounded-full"
        style={{
          boxShadow: "0 0 100px 25px rgba(59, 130, 246, 0.5)",
        }}
      ></div>
    </div>
  );
}
