// src/app/peliculas/[slug]/page.js (CORREGIDO)
"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BACKEND_BASE_URL = "http://localhost:8080";
const STAR_FILLED_IMG = "/CapyEstrella.png";
const STAR_EMPTY_IMG = "/CapyEstrella.png";

export default function MovieDetailPage() {
  const router = useRouter();
  const params = useParams(); 
  const slug = params.slug;   
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!slug) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BACKEND_BASE_URL}/cine/api/movies/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            router.push("/404");
            return;
          }
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        // Mapea los campos de la respuesta del backend a la estructura que espera tu UI
        setMovie({
          tmdbId: data.tmdbId,
          titulo: data.title,
          imagen: data.imageUrl,
          genero: data.genres && data.genres.trim() !== "" ? data.genres : "Desconocido",
          año: data.year,
          director: data.director || "Información no disponible", // Usar el campo del backend
          slug: data.tmdbId,
          descripcion: data.description,
          guionista: data.writers || "Información no disponible", // Usar el campo del backend
          actores: data.actors || "Información no disponible",     // Usar el campo del backend
          calificacionGeneral: Math.round(data.generalRating / 2),
          userRating: 0, // Esto debería venir de tu DB de usuario
          criticas: [], // Esto debería venir de tu DB de usuario
        });
      } catch (err) {
        console.error("Error al cargar detalles de la película:", err);
        setError("No se pudieron cargar los detalles de la película.");
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [slug, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white flex items-center justify-center">
        <p>Cargando detalles de la película...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  if (!movie) {
    return null; // O redirige a una página de error 404 si la película no se encontró
  }

  const handleAddComment = () => {
    console.log("Botón 'Agregar Comentario' clickeado para:", movie.titulo);
    alert("¡Funcionalidad para agregar comentarios en desarrollo!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-6 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] gap-4"> {/* Adjusted grid-rows for flexibility */}
        {/* 1. IMAGEN DE LA PELÍCULA (spans 2 rows, col 1) */}
        <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 flex justify-center lg:justify-center items-start"> {/* CAMBIO AQUÍ: lg:justify-center */}
          <Image
            src={movie.imagen ? `https://image.tmdb.org/t/p/w342${movie.imagen}` : "/default-placeholder.png"}
            alt={movie.titulo}
            width={350}
            height={525}
            className="rounded-lg shadow-lg object-cover"
            priority
            onError={(e) => {
              e.currentTarget.src = "/default-placeholder.png";
              e.currentTarget.onerror = null;
            }}
          />
        </div>

        {/* 2. TÍTULO Y DESCRIPCIÓN (spans 2 cols, row 1) */}
        <div className="lg:col-start-2 lg:col-span-2 lg:row-start-1 flex flex-col items-center lg:items-start">
          <h1 className="text-4xl font-bold mb-4 text-center lg:text-left">{movie.titulo}</h1>
          <p className="text-lg text-gray-300 leading-relaxed text-center lg:text-left">{movie.descripcion}</p>
        </div>

        {/* 3. DETALLES (spans 2 cols, row 2) */}
        <div className="lg:col-start-2 lg:col-span-2 lg:row-start-2 flex flex-col items-center lg:items-start w-full">
          <div className="text-center lg:text-left w-full bg-black/30 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">DETALLES</h3>
            <p><span className="font-bold">AÑO:</span> {movie.año}</p>
            <p><span className="font-bold">GÉNERO:</span> {movie.genero}</p>
            <p><span className="font-bold">DIRECTOR:</span> {movie.director}</p>
            <p><span className="font-bold">GUIONISTA:</span> {movie.guionista}</p>
            <p><span className="font-bold">ACTORES:</span> {movie.actores}</p>
          </div>
        </div>

        {/* 6. CONTENEDOR PARA CALIFICACIÓN GENERAL Y TU CALIFICACIÓN (col 1, row 3) */}
        <div className="lg:col-start-1 lg:row-start-3 flex flex-col gap-4 w-full">
          {/* Calificación General */}
          <div className="bg-black/30 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">CALIFICACIÓN GENERAL</h2>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src={i < movie.calificacionGeneral ? STAR_FILLED_IMG : STAR_EMPTY_IMG}
                  alt={i < movie.calificacionGeneral ? "Estrella llena" : "Estrella vacía"}
                  width={30}
                  height={30}
                  className="inline-block"
                  onError={(e) => console.error(`Error cargando estrella ${i + 1}:`, e.currentTarget.src)}
                />
              ))}
            </div>
            <p className="text-center text-lg font-semibold text-yellow-300">
              {movie.calificacionGeneral >= 4 ? "¡Supercapyrecomendable!" : "Capyrecomendable"}
            </p>
          </div>

          {/* Tu Calificación */}
          <div className="bg-black/30 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">TU CALIFICACIÓN</h2>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src={i < movie.userRating ? STAR_FILLED_IMG : STAR_EMPTY_IMG}
                  alt={i < movie.userRating ? "Estrella llena" : "Estrella vacía"}
                  width={30}
                  height={30}
                  className="inline-block"
                  onError={(e) => console.error(`Error cargando estrella ${i + 1} (usuario):`, e.currentTarget.src)}
                />
              ))}
            </div>
            <p className="text-center text-lg font-semibold text-yellow-300">
              {movie.userRating >= 4 ? "¡Supercapyrecomendable!" : "Capyrecomendable"}
            </p>
          </div>
        </div>

        {/* 4. CUADRO DE COMENTARIOS (col 2, row 3) */}
        <div className="lg:col-start-2 lg:row-start-3 flex flex-col gap-8">
          <div className="bg-black/30 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">¡Deja tu huella!</h2>
            <textarea
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Escribe tu comentario aquí..."
            ></textarea>
            <button
              onClick={handleAddComment}
              className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Agregar Comentario
            </button>
          </div>
        </div>

        {/* 5. BUTACA CRÍTICA (col 3, row 3, spans to end) */}
        <div className="lg:col-start-3 lg:row-start-3 lg:row-span-full flex flex-col gap-4 w-full"> {/* row-span-full to extend to the bottom */}
          <div className="bg-black/30 p-6 rounded-lg shadow-md flex-grow">
            <h2 className="text-2xl font-bold mb-4 text-center">BUTACA CRÍTICA</h2>
            {movie.criticas && movie.criticas.length > 0 ? (
              <div className="space-y-6">
                {movie.criticas.map((critica, idx) => (
                  <div key={idx} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <p className="font-semibold text-purple-300">{critica.usuario} <span className="text-gray-400 text-sm">{critica.haceCuanto}</span></p>
                    <p className="mt-1 text-gray-200 leading-snug">{critica.texto}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400">Aún no hay críticas para esta película.</p>
            )}
          </div>
        </div>

        {/* 7. CAPYBARA (This might need a precise placement if not filling naturally) */}
        <div className="lg:col-start-2 flex justify-center items-end mt-auto">
          <Image
            src="/CapyCientifico.png"
            alt="Capybara Científico"
            width={400}
            height={200}
            className="transform scale-x-[-1]"
            onError={(e) => console.error("Error cargando Capybara Científico:", e.currentTarget.src)}
          />
        </div>
      </div>

      <footer className="mt-16 text-center">
        <Image
          src="/CapybaraOriginal.png"
          alt="Logo CineConecta"
          width={100}
          height={100}
          className="mx-auto"
        />
      </footer>
    </main>
  );
}