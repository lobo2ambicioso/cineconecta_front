"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LayoutBase from "@/layout/layout";
import { api } from "@/lib/axiosInstance";
import Star from "../../../../../public/png/Star.png";
import useAuth from "@/hooks/useAuth";

// Tipos
interface Critica {
  usuario: string;
  haceCuanto: string;
  texto: string;
}

interface Movie {
  tmdbId: string;
  titulo: string;
  imagen: string;
  genero: string;
  año: number;
  director: string;
  slug: string;
  descripcion: string;
  guionista: string;
  actores: string;
  calificacionGeneral: number;
  userRating: number;
  criticas: Critica[];
}

const STAR_FILLED_IMG = Star;
const STAR_EMPTY_IMG = Star;

export default function MovieDetailPage() {
  const { email } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = params?.film as string;

  const [nuevoComentario, setNuevoComentario] = useState<string>("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(`/cine/api/movies/${slug}`);
        const data = response.data;

        const parsedMovie: Movie = {
          tmdbId: data.tmdbId,
          titulo: data.title,
          imagen: data.imageUrl,
          genero: data.genres?.trim() || "Desconocido",
          año: data.year,
          director: data.director || "Información no disponible",
          slug: data.tmdbId,
          descripcion: data.description,
          guionista: data.writers || "Información no disponible",
          actores: data.actors || "Información no disponible",
          calificacionGeneral: Math.round(data.generalRating / 2),
          userRating: 0,
          criticas: [],
        };

        setMovie(parsedMovie);
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

  const handleAddComment = async () => {
    const token = localStorage.getItem("Auth_token");
    if (!token) {
      alert("Debes estar logueado para comentar.");
      return;
    }

    if (!nuevoComentario.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    try {
      const payload = {
        text: nuevoComentario,
        user: email,
      };

      const response = await api.post("/cine/comments", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualizar críticas localmente o volver a cargar
      console.log("Comentario agregado:", response.data);
      alert("¡Comentario enviado!");

      // Opcional: limpiar textarea
      setNuevoComentario("");

      // Reload opcional (mejor: fetch de críticas actualizado)
      // location.reload();
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
      alert("Error al enviar el comentario.");
    }
  };

  return (
    <LayoutBase>
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p>Cargando detalles de la película...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : !movie ? (
          <div className="text-center">Película no encontrada.</div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] gap-4">

            <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 flex justify-center items-start">
              <Image
                src={
                  movie.imagen
                    ? `https://image.tmdb.org/t/p/w342${movie.imagen}`
                    : "/default-placeholder.png"
                }
                alt={movie.titulo}
                width={350}
                height={525}
                className="rounded-lg shadow-lg object-cover"
                priority
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "/default-placeholder.png";
                  e.currentTarget.onerror = null;
                }}
              />
            </div>

            {/* Título y descripción */}
            <div className="lg:col-start-2 lg:col-span-2 lg:row-start-1 flex flex-col items-center lg:items-start">
              <h1 className="text-4xl font-bold mb-4 text-center lg:text-left">
                {movie.titulo}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed text-center lg:text-left">
                {movie.descripcion}
              </p>
            </div>

            {/* Detalles */}
            <div className="lg:col-start-2 lg:col-span-2 lg:row-start-2 flex flex-col items-center lg:items-start w-full">
              <div className="text-center lg:text-left w-full bg-black/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">DETALLES</h3>
                <p>
                  <span className="font-bold">AÑO:</span> {movie.año}
                </p>
                <p>
                  <span className="font-bold">GÉNERO:</span> {movie.genero}
                </p>
                <p>
                  <span className="font-bold">DIRECTOR:</span> {movie.director}
                </p>
                <p>
                  <span className="font-bold">GUIONISTA:</span>{" "}
                  {movie.guionista}
                </p>
                <p>
                  <span className="font-bold">ACTORES:</span> {movie.actores}
                </p>
              </div>
            </div>

            {/* Calificación general */}
            <div className="lg:col-start-1 lg:row-start-3 flex flex-col gap-4 w-full">
              <div className="bg-black/30 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  CALIFICACIÓN GENERAL
                </h2>
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      src={
                        i < movie.calificacionGeneral
                          ? STAR_FILLED_IMG
                          : STAR_EMPTY_IMG
                      }
                      alt={
                        i < movie.calificacionGeneral
                          ? "Estrella llena"
                          : "Estrella vacía"
                      }
                      width={30}
                      height={30}
                      className="inline-block"
                    />
                  ))}
                </div>
                <p className="text-center text-lg font-semibold text-yellow-300">
                  {movie.calificacionGeneral >= 4
                    ? "¡Supercapyrecomendable!"
                    : "Capyrecomendable"}
                </p>
              </div>

              {/* Tu calificación */}
              <div className="bg-black/30 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  TU CALIFICACIÓN
                </h2>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      src={
                        i < movie.userRating ? STAR_FILLED_IMG : STAR_EMPTY_IMG
                      }
                      alt={
                        i < movie.userRating
                          ? "Estrella llena"
                          : "Estrella vacía"
                      }
                      width={30}
                      height={30}
                      className="inline-block"
                    />
                  ))}
                </div>
                <p className="text-center text-lg font-semibold text-yellow-300">
                  {movie.userRating >= 4
                    ? "¡Supercapyrecomendable!"
                    : "Capyrecomendable"}
                </p>
              </div>
            </div>

            {/* Comentario */}
            <div className="lg:col-start-2 lg:row-start-3 flex flex-col gap-8">
              <div className="bg-black/30 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  ¡Deja tu huella!
                </h2>
                <textarea
                  className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                  placeholder="Escribe tu comentario aquí..."
                  value={nuevoComentario}
                  onChange={e => setNuevoComentario(e.target.value)}
                />
                <button
                  onClick={handleAddComment}
                  className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Agregar Comentario
                </button>
              </div>
            </div>

            <div className="lg:col-start-3 lg:row-start-3 lg:row-span-full flex flex-col gap-4 w-full">
              <div className="bg-black/30 p-6 rounded-lg shadow-md flex-grow">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  BUTACA CRÍTICA
                </h2>
                {movie.criticas.length > 0 ? (
                  <div className="space-y-6">
                    {movie.criticas.map((critica: Critica, idx: number) => (
                      <div
                        key={idx}
                        className="border-b border-gray-700 pb-4 last:border-b-0"
                      >
                        <p className="font-semibold text-purple-300">
                          {critica.usuario}{" "}
                          <span className="text-gray-400 text-sm">
                            {critica.haceCuanto}
                          </span>
                        </p>
                        <p className="mt-1 text-gray-200 leading-snug">
                          {critica.texto}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400">
                    Aún no hay críticas para esta película.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </LayoutBase>
  );
}
