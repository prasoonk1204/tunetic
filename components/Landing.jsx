import Link from "next/link";


export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      <h1>Landing Page</h1>

      <Link href="/login" className="bg-gray-300 px-4 py-2">LOGIN / SIGNUP</Link>
    </div>
  );
}
