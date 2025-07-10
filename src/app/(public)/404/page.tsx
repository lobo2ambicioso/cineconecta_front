"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Ghost } from "lucide-react";
import Button from "@/components/Button";

const NotFoundPage = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black from-1% to-[#3C1A81] to-50%">
      <div className="flex flex-col justify-center items-center bg-black/40 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <Ghost className="w-24 h-24 text-purple-500 my-4  animate-bounce" />
        <h1 className="text-5xl font-extrabold text-blue-500 mb-2 drop-shadow-lg">
          404
        </h1>
        <h3 className="text-2xl font-semibold text-white mb-2">
          Page not found
        </h3>
        <p className="text-gray-400 mb-8 text-center">
          please return or go to home
        </p>
        <Button
          color="#fff"
          bgcolor="#3c1a81"
          onClick={handleHome}
          text="Go to Home"
          className="px-10 py-3 shadow-lg hover:bg-blue-700 transition"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
