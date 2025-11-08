import Landing from "@/pages/Landing";
import { Montserrat, Lobster } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {
  return (
    <div
      className={`min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors ${montserrat.className} ${lobster.variable}`}
    >
      <Landing />
    </div>
  );
}
