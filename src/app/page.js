// src/app/page.js
"use client";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Sección principal con fondo y logo centrado */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/collage.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
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
          <Image src="/pirata.jpeg" alt="Función 1" width={400} height={250} className="object-cover rounded-lg shadow-md" />
          <Image src="/vikingo.jpeg" alt="Función 2" width={400} height={250} className="object-cover rounded-lg shadow-md" />
          <Image src="/mago.jpeg" alt="Función 3" width={400} height={250} className="object-cover rounded-lg shadow-md" />
          <Image src="/samurai.jpeg" alt="Función 4" width={400} height={250} className="object-cover rounded-lg shadow-md" />
          <Image src="/agente.jpeg" alt="Función 5" width={400} height={250} className="object-cover rounded-lg shadow-md" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <Image
          src="/logo.png"
          alt="Cine Conecta Logo"
          width={400}
          height={120}
          className="mx-auto"
        />
      </footer>

      {/* Preguntas Frecuentes */}
      <section className="bg-black py-10 px-4 sm:px-20">
        <div className="max-w-3xl mx-auto space-y-4 text-left text-sm sm:text-base">
          <details className="border-b border-white py-2">
            <summary className="cursor-pointer text-white">¿Cómo me registro en CineConecta?</summary>
            <p className="mt-2 text-gray-300">
              En la parte superior de la página principal o de inicio, del lado derecho se encuentran los botones ‘Registrarse’ e ‘Ingresar’. Al dar clic en ‘Registrarse’ se abrirá un formulario donde ingresarás tu nombre, apellido, correo y contraseña. Al dar clic en ‘Registrarse’, quedarás registrado en CineConecta.
            </p>
          </details>

          <details className="border-b border-white py-2">
            <summary className="cursor-pointer text-white">¿Qué funciones ofrece mi perfil?</summary>
            <p className="mt-2 text-gray-300">
              Al tener perfil en CineConecta tendrás acceso a la búsqueda de películas por título o filtros como género, año o director. Adicionalmente, en cada película podrás calificarla, dar tu opinión y visualizar la calificación global y reseñas de otros usuarios.
            </p>
          </details>

          <details className="border-b border-white py-2">
            <summary className="cursor-pointer text-white">¿Cómo califico y reseño una película?</summary>
            <p className="mt-2 text-gray-300">
              Al encontrar la película que deseas calificar o reseñar usando la función de búsqueda, debajo de la descripción y los datos de la película encontrarás íconos de estrellas. Con ellos podrás calificar la película según la cantidad de estrellas que selecciones. Y del lado derecho de la ventana encontrarás un cuadro de texto donde podrás dejar tu opinión.
            </p>
          </details>

          <details className="border-b border-white py-2">
            <summary className="cursor-pointer text-white">¿CineConecta tiene un costo?</summary>
            <p className="mt-2 text-gray-300">
              Para satisfacción de nuestros usuarios, CineConecta es completamente ¡GRATIS! Entonces, ¿qué esperas para empezar a calificar y opinar sobre películas en nuestra plataforma?
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}