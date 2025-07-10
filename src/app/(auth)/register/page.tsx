"use client";
import Image from "next/image";
import capibaraLeft from "../../../../public/png/Capibara left.png";
import capibaraRight from "../../../../public/png/Capibara right.png";
import logo from "../../../../public/jpg/logo.jpg";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const LoginPage = () => {
  const { register } = useAuth();
  const route = useRouter();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleHome = () => {
    route.push("/");
  };

  const handleRegister = () => {
    register(
      registerForm.name,
      registerForm.email,
      registerForm.password,
      registerForm.phone
    );
  };

  const updateForm = (key: keyof RegisterForm, value: string) => {
    setRegisterForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <main className="w-screen h-screen bg-gradient-to-b from-black from-1% to-[#3C1A81] to-50%">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12">
        <Image
          src={capibaraLeft}
          alt="Capybara Romano Izquierda"
          width={350}
          height={300}
          className="hidden md:block transform "
        />

        <div className="bg-black/30 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <Image
            src={logo}
            alt="CineConecta Logo"
            width={100}
            height={100}
            className="mx-auto mb-6 cursor-pointer"
            onClick={handleHome}
          />

          <div className="flex flex-col gap-4">
            <Input
              placeholder="Name"
              value={registerForm.name}
              onChange={e => updateForm("name", e.target.value)}
            />
            <Input
              placeholder="Email"
              value={registerForm.email}
              onChange={e => updateForm("email", e.target.value)}
            />
            <Input
              placeholder="Phone"
              value={registerForm.phone}
              onChange={e => updateForm("phone", e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={registerForm.password}
              onChange={e => updateForm("password", e.target.value)}
            />
          </div>

          <Button
            text="Register"
            color="#ffff"
            bgcolor="#371775"
            className="mt-10 hover:shadow hover:shadow-purple-800 transition-all duration-500"
            onClick={handleRegister}
          />
        </div>

        <Image
          src={capibaraRight}
          alt="Capybara Romano Derecha"
          width={350}
          height={300}
          className="hidden md:block"
        />
      </div>
    </main>
  );
};

export default LoginPage;
