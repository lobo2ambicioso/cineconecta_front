// src/app/perfil/page.js
"use client";
import Image from "next/image";

export default function PerfilPage() {
  const insignias = [
    { img: "/insignia1.png", texto: "COMEDIANTE (20 comedias)" },
    { img: "/insignia2.png", texto: "COMEDIANTE PRINCIPIANTE (5 comedias)" },
    { img: "/insignia2.png", texto: "CINEFILO (20 películas)" },
    { img: "/insignia2.png", texto: "CINEFILO PRO (50 películas)" },
    { img: "/insignia3.png", texto: "CINEFILO LEYENDA (100 películas)" },
  ];

  const vistas = [
    { img: "/padrino.jpg", titulo: "El Padrino" },
    { img: "/lilo.jpg", titulo: "Lilo y Stitch" },
    { img: "/lotr.webp", titulo: "El Señor de los Anillos" },
    { img: "/vicky.jpg", titulo: "Vicky Cristina Barcelona" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-6 py-8">
      {/*
        Hemos eliminado la sección de información del usuario de aquí.
        El Header (definido en layout.js) debería encargarse de mostrar
        el nombre de usuario y el avatar si el usuario está logueado,
        o los botones de "Registrarse" / "Ingresar" si no lo está.
      */}
      {/* <div className="flex justify-end items-center mb-8">
        <span className="mr-3">Usuario123</span>
        <Image
          src="/avatar.png"
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div> */}

      {/* Contenido principal dividido en dos secciones */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sección de Insignias (30%) */}
        <section className="w-full md:w-1/3">
          <h2 className="text-xl font-bold mb-4">INSIGNIAS</h2>
          <div className="space-y-5">
            {insignias.map((insignia, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <Image src={insignia.img} alt="Insignia" width={60} height={60} />
                <span className="text-sm">{insignia.texto}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Películas vistas (70%) */}
        <section className="w-full md:w-2/3">
          <h2 className="text-xl font-bold mb-4 text-center md:text-left">PELÍCULAS VISTAS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {vistas.map((peli, idx) => (
              <div key={idx} className="text-center">
                <Image
                  src={peli.img}
                  alt={peli.titulo}
                  width={150}
                  height={200}
                  className="rounded-lg mx-auto object-cover shadow-md"
                />
                <p className="text-sm mt-2">{peli.titulo}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}