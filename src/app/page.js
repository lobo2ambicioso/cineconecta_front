// src/app/page.js
"use client"; // Es bueno mantenerlo si usas cosas de cliente como usePathname en Header, aunque en esta página no lo uses directamente.
import Image from "next/image";
// import Header from "@/components/Header"; // <--- ¡ELIMINA ESTA LÍNEA!

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hemos eliminado la inclusión del Header aquí.
        El Header ya es renderizado por el RootLayout (src/app/layout.js)
        y aparecerá automáticamente en la parte superior de esta página.
      */}
      {/* <Header /> */} {/* <--- ¡ELIMINA O COMENTA ESTA LÍNEA! */}

      {/* Sección principal con fondo y logo centrado */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/collage.png')" }}
      >
        {/* Capa oscura encima del fondo */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* Logo centrado */}
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <Image
            src="/CapybaraOriginal.png"
            alt="CineConecta Logo"
            width={240}
            height={240}
            className="shadow-lg max-w-[240px] h-auto"
          />
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="bg-gradient-to-b from-purple-900 to-black py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center px-4">
          <Image src="/pirata.jpeg" alt="Función 1" width={400} height={200} />
          <Image src="/vikingo.jpeg" alt="Función 2" width={400} height={200} />
          <Image src="/mago.jpeg" alt="Función 3" width={400} height={200} />
          <Image src="/samurai.jpeg" alt="Función 4" width={400} height={200} />
          <Image src="/agente.jpeg" alt="Función 5" width={400} height={200} />
        </div>
      </section>

      {/* Footer con logo más ancho */}
      <footer className="bg-black py-10 text-center">
        <Image
          src="/logo.png"
          alt="Cine Conecta Logo"
          width={400} // Aumenta el ancho
          height={120} // Reduce la altura
          className="mx-auto"
        />
      </footer>

      {/* Preguntas Frecuentes (FAQ) */}
      <section className="bg-black py-10 px-4 sm:px-20">
        <div className="max-w-3xl mx-auto space-y-4 text-left text-sm sm:text-base">
          {[
            "¿Cómo me registro en CineConecta?",
            "¿Qué funciones ofrece mi perfil?",
            "¿Cómo califico y reseño una película?",
            "¿CineConecta tiene un costo?",
          ].map((question, idx) => (
            <details key={idx} className="border-b border-white py-2">
              <summary className="cursor-pointer text-white">{question}</summary>
              <p className="mt-2 text-gray-300">Contenido de respuesta (puedes personalizarlo luego).</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}