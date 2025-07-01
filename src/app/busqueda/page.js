// src/app/recomendaciones/page.js
"use client";
import Image from "next/image";
import Link from "next/link"; // Importa el componente Link
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const recomendaciones = [
  {
    titulo: "Cumbres Borrascosas",
    imagen: "/cumbresborroscosas.jpg",
    genero: "Drama",
    año: 1939,
    director: "William Wyler",
    slug: "cumbres-borrascosas", // Añadido el slug
  },
  {
    titulo: "Orgullo y Prejuicio",
    imagen: "/orgulloyprejuicio.png",
    genero: "Romance",
    año: 2005,
    director: "Joe Wright",
    slug: "orgullo-y-prejuicio", // Añadido el slug
  },
  {
    titulo: "Blade Runner",
    imagen: "/bladerunner.webp",
    genero: "Ciencia Ficción",
    año: 1982,
    director: "Ridley Scott",
    slug: "blade-runner", // Añadido el slug
  },
  {
    titulo: "El castillo vagabundo",
    imagen: "/castillovagabundo.jpg",
    genero: "Animación",
    año: 2004,
    director: "Hayao Miyazaki",
    slug: "el-castillo-vagabundo", // Añadido el slug
  },
  {
    titulo: "Mother",
    imagen: "/Mother.jpg",
    genero: "Suspenso",
    año: 2017,
    director: "Darren Aronofsky",
    slug: "mother", // Añadido el slug
  },
  {
    titulo: "Dune 2",
    imagen: "/Dune 2.jpg",
    genero: "Ciencia Ficción",
    año: 2024,
    director: "Denis Villeneuve",
    slug: "dune-2", // Añadido el slug
  },
  {
    titulo: "No Country for Old Men",
    imagen: "/No Country for Old Men.jpg",
    genero: "Crimen",
    año: 2007,
    director: "Joel Coen",
    slug: "no-country-for-old-men", // Añadido el slug
  },
  {
    titulo: "Vicky Cristina Barcelona",
    imagen: "/vicky.jpg",
    genero: "Comedia",
    año: 2008,
    director: "Woody Allen",
    slug: "vicky-cristina-barcelona", // Añadido el slug
  },
  {
    titulo: "El Señor de los Anillos",
    imagen: "/lotr.webp",
    genero: "Fantasía",
    año: 2001,
    director: "Peter Jackson",
    slug: "el-senor-de-los-anillos", // Añadido el slug
  },
  {
    titulo: "Lilo y Stitch",
    imagen: "/lilo.jpg",
    genero: "Animación",
    año: 2002,
    director: "Dean DeBlois",
    slug: "lilo-y-stitch", // Añadido el slug
  },
  {
    titulo: "El Padrino",
    imagen: "/padrino.jpg",
    genero: "Drama",
    año: 1972,
    director: "Francis Ford Coppola",
    slug: "el-padrino", // Añadido el slug
  },
];

export default function RecomendacionesPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos"); // 'todos' es el filtro por defecto (título)

  const filtrarPeliculas = () => {
    return recomendaciones.filter((peli) => {
      let coincideBusqueda = false;

      // Filtra por el campo seleccionado
      if (filtro === "todos") { // Corresponde al título
        coincideBusqueda = peli.titulo.toLowerCase().includes(busqueda.toLowerCase());
      } else if (filtro === "genero") {
        coincideBusqueda = peli.genero.toLowerCase().includes(busqueda.toLowerCase());
      } else if (filtro === "año") {
        coincideBusqueda = peli.año.toString().includes(busqueda);
      } else if (filtro === "director") {
        coincideBusqueda = peli.director.toLowerCase().includes(busqueda.toLowerCase());
      }

      return coincideBusqueda;
    });
  };

  // Función para obtener las clases CSS del botón según si está activo o no
  const getButtonClasses = (currentFilter) => {
    return `px-4 py-2 rounded transition ${
      filtro === currentFilter
        ? "bg-purple-700 text-white" // Un tono de púrpura más claro para el seleccionado
        : "bg-[#1B023E] hover:bg-purple-900 text-white" // El color exacto para no seleccionado, y un hover más claro
    }`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-4 sm:px-12 py-8">
      {/* Filtros y barra de búsqueda */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex flex-wrap gap-4">
          <button onClick={() => setFiltro("todos")} className={getButtonClasses("todos")}>
            TÍTULO
          </button>
          <button onClick={() => setFiltro("genero")} className={getButtonClasses("genero")}>
            GÉNERO
          </button>
          <button onClick={() => setFiltro("año")} className={getButtonClasses("año")}>
            AÑO
          </button>
          <button onClick={() => setFiltro("director")} className={getButtonClasses("director")}>
            DIRECTOR
          </button>
        </div>
        <div className="flex items-center bg-white text-black px-4 py-2 rounded w-full sm:w-72">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-transparent outline-none"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <FaSearch className="text-purple-800 ml-2" />
        </div>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-semibold mb-6 text-center">BÚSQUEDA</h2> {/* Cambiado de RECOMENDACIONES a BÚSQUEDA */}

      {/* Cuadrícula de películas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"> {/* Cambiado md:grid-cols-4 a md:grid-cols-5 */}
        {filtrarPeliculas().map((peli, idx) => (
          <div key={idx} className="text-center">
            {/* Envuelve la imagen y el título en un Link dinámico */}
            <Link href={`/peliculas/${peli.slug}`} passHref>
              {/* Contenedor de imagen con tamaño fijo para asegurar alineación */}
              <div className="w-[180px] h-[270px] relative rounded-xl shadow-md overflow-hidden mx-auto cursor-pointer">
                <Image
                  src={peli.imagen}
                  alt={peli.titulo}
                  fill // Hace que la imagen llene el contenedor padre
                  className="object-cover transition-transform duration-300 hover:scale-105" // Recorta para cubrir el área
                />
              </div>
              <p className="mt-2 text-sm">{peli.titulo}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Footer */}
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