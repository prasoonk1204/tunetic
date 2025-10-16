import Landing from "@/pages/Landing";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function Page() {
  return (
    <div
      className={`min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors ${montserrat.className}`}
    >
      <Landing />
    </div>
  );
}
