"use client";
import Image from "next/image";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ correo: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (form.correo && form.password) {
      // Simula login exitoso
      router.push("/recomendaciones");
    } else {
      alert("Completa todos los campos.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12">

        {/* Capybara izquierda volteada */}
        <Image
          src="/CapybaraRomano.png"
          alt="Capybara Romano Izquierda"
          width={350}
          height={300}
          className="hidden md:block transform scale-x-[-1]"
        />

        {/* Formulario */}
        <div className="bg-black/30 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <Image
            src="/CapybaraOriginal.png"
            alt="CineConecta Logo"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />

          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextInput label="Correo" name="correo" type="email" onChange={handleChange} />
            <TextInput label="Contraseña" name="password" type="password" onChange={handleChange} />
            <Button type="submit">Ingresar</Button>
          </form>
        </div>

        {/* Capybara derecha */}
        <Image
          src="/CapybaraRomano.png"
          alt="Capybara Romano Derecha"
          width={350}
          height={300}
          className="hidden md:block"
        />
      </div>
    </main>
  );
}