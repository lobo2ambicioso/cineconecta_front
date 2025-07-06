// src/app/busqueda/page.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import { GenreSelect } from "@/components/GenreSelect";

const BACKEND_BASE_URL = "http://localhost:8080";

export default function BusquedaPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("titulo");
  const [peliculas, setPeliculas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(
    debounce(async (term, currentFilter) => {
      if (!term.trim()) {
        setPeliculas([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      let url = `${BACKEND_BASE_URL}/cine/api/movies/search?`;

      switch (currentFilter) {
        case "titulo":
          url += `query=${encodeURIComponent(term)}`;
          break;
        case "genero":
          url += `genre=${encodeURIComponent(term)}`;
          break;
        case "año":
          const yearNum = parseInt(term, 10);
          if (isNaN(yearNum)) {
            setError("Por favor, introduce un año válido.");
            setIsLoading(false);
            return;
          }
          url += `year=${yearNum}`;
          break;
        default:
          setError("Criterio de búsqueda no válido.");
          setIsLoading(false);
          return;
      }

      try {
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            setPeliculas([]);
            setError("No se encontraron películas que coincidan con la búsqueda.");
          } else {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
          }
        } else {
          const data = await response.json();
          setPeliculas(data);
        }
      } catch (err) {
        console.error("Error al cargar películas:", err);
        setError("No se pudieron cargar las películas. Intenta de nuevo más tarde.");
        setPeliculas([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchMovies(busqueda, filtro);
  }, [busqueda, filtro, fetchMovies]);

  const handleBusquedaChange = (e) => setBusqueda(e.target.value);

  const handleFiltroChange = (newFiltro) => {
    setFiltro(newFiltro);
    setBusqueda("");
  };

  const getButtonClasses = (currentFilter) =>
    `px-4 py-2 rounded transition ${
      filtro === currentFilter
        ? "bg-purple-700 text-white"
        : "bg-[#1B023E] hover:bg-purple-900 text-white"
    }`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-4 sm:px-12 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex flex-wrap gap-4">
          <button onClick={() => handleFiltroChange("titulo")} className={getButtonClasses("titulo")}>TÍTULO</button>
          <button onClick={() => handleFiltroChange("genero")} className={getButtonClasses("genero")}>GÉNERO</button>
          <button onClick={() => handleFiltroChange("año")} className={getButtonClasses("año")}>AÑO</button>
        </div>

        {filtro === "genero" ? (
          <div className="w-full sm:w-80 ml-auto">
            <GenreSelect
              onGenreChange={(genreId) => setBusqueda(genreId)}
              className="w-full px-4 py-3 rounded-md bg-purple-700 text-white text-lg shadow-md focus:outline-none"
            />
          </div>
        ) : (
          <div className="flex items-center bg-white text-black px-4 py-2 rounded w-full sm:w-72 ml-auto">
            <input
              type={filtro === "año" ? "number" : "text"}
              placeholder={`Buscar películas por ${filtro}...`}
              className="w-full bg-transparent outline-none"
              value={busqueda}
              onChange={handleBusquedaChange}
            />
            <FaSearch className="text-purple-800 ml-2" />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-center">BÚSQUEDA DE PELÍCULAS</h2>

      {isLoading && <p className="text-center text-xl text-purple-400">Cargando películas...</p>}
      {error && <p className="text-center text-xl text-red-500">{error}</p>}

      {!isLoading && !error && peliculas.length === 0 && busqueda.trim() !== "" && (
        <p className="text-center text-xl text-gray-400">No se encontraron películas para "{busqueda}".</p>
      )}

      {!isLoading && !error && peliculas.length === 0 && busqueda.trim() === "" && (
        <div className="text-center text-gray-400 text-lg mt-10">
          <p>Comienza a escribir para buscar películas en TMDb.</p>
          <Image
            src="/CapybaraOriginal.png"
            alt="CineConecta Logo"
            width={150}
            height={150}
            className="mx-auto mt-6 opacity-80"
          />
        </div>
      )}

      {!isLoading && !error && peliculas.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {peliculas.map((peli) => (
            <div key={peli.tmdbId} className="text-center">
              <Link href={`/peliculas/${peli.tmdbId}`} passHref>
                <div className="w-[180px] h-[270px] relative rounded-xl shadow-md overflow-hidden mx-auto cursor-pointer">
                  <Image
                    src={peli.imageUrl ? `https://image.tmdb.org/t/p/w342${peli.imageUrl}` : "/default-placeholder.png"}
                    alt={peli.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/default-placeholder.png";
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <p className="mt-2 text-sm">{peli.title}</p>
                <p className="text-xs text-gray-400">{peli.year}</p>
              </Link>
            </div>
          ))}
        </div>
      )}

      <footer className="mt-16 text-center">
        <Image
          src="/CapybaraOriginal.png"
          alt="Logo CineConecta"
          width={220}
          height={120}
          className="mx-auto"
        />
      </footer>
    </main>
  );
}