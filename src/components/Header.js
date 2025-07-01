// src/components/Header.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isAuthPage = pathname === "/register" || pathname === "/login";
  const isLoggedInPage = pathname === "/perfil" || pathname === "/recomendaciones";

  return (
    <header className="bg-black text-white flex justify-between items-center px-4 sm:px-8 h-20">
      {/* Sección Izquierda: Logo CineConecta */}
      <Link href="/" className="flex items-center flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Logo CineConecta"
          width={80}
          height={28}
          priority
        />
      </Link>

      {/* Sección Central: Botón de Recomendaciones (condicional) */}
      <div className="flex-grow flex justify-center"> {/* flex-grow para ocupar espacio y justify-center para centrar */}
        {isLoggedInPage && (
          <Link href="/recomendaciones">
            <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition">
              Recomendaciones
            </button>
          </Link>
        )}
      </div>

      {/* Sección Derecha: Botones de Auth o Info de Usuario (condicional) */}
      <div className="flex items-center space-x-4 flex-shrink-0"> {/* flex-shrink-0 para evitar que se encoja */}
        {!isAuthPage && !isLoggedInPage && (
          <>
            <Link href="/register">
              <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition">
                Registrarse
              </button>
            </Link>
            <Link href="/login">
              <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition">
                Ingresar
              </button>
            </Link>
          </>
        )}

        {isLoggedInPage && (
          // Contenido de usuario logueado: nombre y avatar
          <Link href="/perfil" className="flex items-center gap-2 group">
            <span className="text-white group-hover:text-purple-300 transition">Usuario123</span>
            <Image
              src="/avatar.png" // Asegúrate de que esta imagen exista en tu carpeta 'public'
              alt="Avatar de usuario"
              width={40}
              height={40}
              className="rounded-full border border-white group-hover:border-purple-300 transition"
            />
          </Link>
        )}
      </div>
    </header>
  );
}