"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-black text-white flex justify-between items-center px-4 sm:px-8 h-20">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo CineConecta"
          width={140}
          height={40}
          priority
        />
      </Link>

      {/* Botones condicionales */}
      <div className="space-x-4">
        {pathname !== "/register" && pathname !== "/login" && (
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

        {pathname === "/recomendaciones" && (
          <Link href="/perfil">
            <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition">
              Perfil
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}