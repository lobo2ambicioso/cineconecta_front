"use client";
import Image from "next/image";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (form.nombre && form.apellido && form.correo && form.password) {
      // Aquí podrías hacer una petición a tu backend para registrar al usuario
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

        {/* Formulario de registro */}
        <div className="bg-black/30 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <Image
            src="/CapybaraOriginal.png"
            alt="CineConecta Logo"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />

          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextInput label="Nombre" name="nombre" onChange={handleChange} />
            <TextInput label="Apellido" name="apellido" onChange={handleChange} />
            <TextInput label="Correo" name="correo" type="email" onChange={handleChange} />
            <TextInput label="Contraseña" name="password" type="password" onChange={handleChange} />
            <Button type="submit">Registrarse</Button>
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
