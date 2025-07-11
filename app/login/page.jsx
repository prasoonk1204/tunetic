"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken")

    if(jwtToken) {
      router.push("/home")
    }
  }, [router])

  const login = () => {
    localStorage.setItem("User", "testUser");
    localStorage.setItem("jwtToken", "testToken");

    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors pt-22 h-screen flex justify-center items-center flex-col gap-10">
      LOGIN page
      <button className="bg-gray-300 " onClick={login}>
        LOGIN
      </button>
    </div>
  );
}
