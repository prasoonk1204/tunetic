import Landing from "../components/Landing";
import Header from "@/components/Header";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors pt-22">
      <Header />
      <Landing />
    </div>
  );
}
