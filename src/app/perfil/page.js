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

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-6 py-8">
      {/* Contenido principal dividido en dos secciones */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sección de Insignias (30%) */}
        <section className="w-full md:w-1/3">
          <h2 className="text-2xl font-bold mb-4 text-center">INSIGNIAS</h2>
          <div className="space-y-5">
            {insignias.map((insignia, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <Image src={insignia.img} alt="Insignia" width={60} height={60} />
                <span className="text-sm">{insignia.texto}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de la imagen CapiManual.png (70%) */}
        <section className="w-full md:w-2/3 flex flex-col justify-center items-center min-h-[1000px] relative">
          {/* Aumentamos los valores de max-w y max-h para que la imagen sea más grande */}
          <div className="relative w-full h-full max-w-[1400px] max-h-[2000px]">
            <Image
              src="/CapiManual.png"
              alt="Manual de Capi"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>
      </div>
    </main>
  );
}