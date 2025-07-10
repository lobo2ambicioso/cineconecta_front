"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import LayoutBase from "@/layout/layout";
import Button from "@/components/Button";

const RegisterSuccessPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <main>
      <LayoutBase>
        <div className="flex flex-col justify-center h-[58.6vh] w-full bg-linear-to-t from-purple-950 to-purple-700 items-center">
          <div className="flex flex-col items-center bg-black/30 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
            <CircleCheck color="#05df46" className="w-18 h-18 mb-2" />
            <h1 className="text-2xl font-bold text-white my-2">
              Register success
            </h1>
            <h6 className="text-gray-200 mb-6 text-center">
              Register its completed
              <br />
              Please go to login
            </h6>

            <Button
              text="Login"
              color="#ffff"
              bgcolor="#371775"
              className="mt-10 hover:shadow hover:shadow-purple-800 transition-all duration-500"
              onClick={handleLogin}
            />
          </div>
        </div>
      </LayoutBase>
    </main>
  );
};

export default RegisterSuccessPage;
