// src/app/peliculas/[slug]/page.js
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Rutas de las imágenes para las estrellas (¡ASEGÚRATE DE QUE ESTOS ARCHIVOS EXISTAN EN public/!)
const STAR_FILLED_IMG = "/CapyEstrella.png"; // Usar CapyEstrella.png para estrellas "llenas"
const STAR_EMPTY_IMG = "/CapyEstrella.png";   // Usar CapyEstrella.png para estrellas "vacías"

// Datos de ejemplo para simular películas (en una app real, vendrían de una API/DB)
const allMoviesData = [
  {
    titulo: "Cumbres Borrascosas",
    imagen: "/cumbresborroscosas.jpg",
    genero: "Drama",
    año: "1939",
    director: "William Wyler",
    slug: "cumbres-borrascosas",
    descripcion: "Una historia clásica de amor y obsesión ambientada en los páramos de Yorkshire. Heathcliff y Catherine se ven envueltos en un torbellino de pasión y tragedia que afecta a varias generaciones.",
    guionista: "Ben Hecht, Charles MacArthur",
    actores: "Laurence Olivier, Merle Oberon, David Niven",
    calificacionGeneral: 4,
    userRating: 3,
    criticas: [
      { usuario: "LectorClasico", haceCuanto: "Hace 1 semana", texto: "Una adaptación fiel y emotiva. La química entre los protagonistas es innegable." }
    ]
  },
  {
    titulo: "Orgullo y Prejuicio",
    imagen: "/orgulloyprejuicio.png",
    genero: "Romance",
    año: "2005",
    director: "Joe Wright",
    slug: "orgullo-y-prejuicio",
    descripcion: "Basada en la novela de Jane Austen, sigue la historia de Elizabeth Bennet, una de cinco hermanas en la Inglaterra del siglo XIX, mientras navega por las expectativas sociales, el orgullo y los prejuicios en la búsqueda del amor.",
    guionista: "Deborah Moggach",
    actores: "Keira Knightley, Matthew Macfadyen, Brenda Blethyn",
    calificacionGeneral: 5,
    userRating: 4,
    criticas: [
      { usuario: "RomanticaEmpedernida", haceCuanto: "Hace 2 días", texto: "Simplemente hermosa. La dirección, las actuaciones y la banda sonora hacen de esta una joya atemporal." }
    ]
  },
  {
    titulo: "Blade Runner",
    imagen: "/bladerunner.webp",
    genero: "Ciencia Ficción",
    año: "1982",
    director: "Ridley Scott",
    slug: "blade-runner",
    descripcion: "En un futuro distópico, un 'blade runner' retirado es llamado para cazar a un grupo de replicantes (androides) que han regresado a la Tierra en busca de su creador.",
    guionista: "Hampton Fancher, David Webb Peoples",
    actores: "Harrison Ford, Rutger Hauer, Sean Young",
    calificacionGeneral: 5,
    userRating: 5,
    criticas: [
      { usuario: "CinefiloSciFi", haceCuanto: "Hace 3 días", texto: "Un clásico de la ciencia ficción que sigue siendo relevante hoy en día. La atmósfera y las preguntas filosóficas son profundas." }
    ]
  },
  {
    titulo: "El castillo vagabundo",
    imagen: "/castillovagabundo.jpg",
    genero: "Animación",
    año: "2004",
    director: "Hayao Miyazaki",
    slug: "el-castillo-vagabundo",
    descripcion: "Una joven es convertida en anciana por una bruja celosa y busca la ayuda de un mago en un castillo andante para romper la maldición.",
    guionista: "Hayao Miyazaki",
    actores: "Chieko Baisho, Takuya Kimura, Akihiro Miwa",
    calificacionGeneral: 5,
    userRating: 5,
    criticas: [
      { usuario: "FanDeGhibli", haceCuanto: "Hace 1 día", texto: "Una obra de arte visual y narrativa. Miyazaki nunca decepciona con sus mundos mágicos y personajes entrañables." }
    ]
  },
  {
    titulo: "Mother",
    imagen: "/Mother.jpg",
    genero: "Suspenso",
    año: "2017",
    director: "Darren Aronofsky",
    slug: "mother",
    descripcion: "La relación de una pareja se pone a prueba cuando invitados no deseados irrumpen en su tranquilo hogar, sumergiéndolos en un torbellino de caos y paranoia.",
    guionista: "Darren Aronofsky",
    actores: "Jennifer Lawrence, Javier Bardem, Ed Harris",
    calificacionGeneral: 3,
    userRating: 2,
    criticas: [
      { usuario: "CriticoAudaz", haceCuanto: "Hace 4 días", texto: "Intensa y perturbadora. No es para todos, pero es una experiencia cinematográfica que te hace pensar." }
    ]
  },
  {
    titulo: "Dune 2",
    imagen: "/Dune 2.jpg",
    genero: "Ciencia Ficción",
    año: "2024",
    director: "Denis Villeneuve",
    slug: "dune-2",
    descripcion: "La segunda parte de la épica saga de ciencia ficción, donde Paul Atreides se une a Chani y los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.",
    guionista: "Denis Villeneuve, Jon Spaihts, Eric Roth",
    actores: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
    calificacionGeneral: 5,
    userRating: 5,
    criticas: [
      { usuario: "FanDeDune", haceCuanto: "Hace 1 día", texto: "¡Absolutamente espectacular! Superó todas mis expectativas. Un logro cinematográfico." }
    ]
  },
  {
    titulo: "No Country for Old Men",
    imagen: "/No Country for Old Men.jpg",
    genero: "Crimen",
    año: "2007",
    director: "Joel Coen",
    slug: "no-country-for-old-men",
    descripcion: "Un cazador se topa con una escena de un crimen y una maleta llena de dinero, lo que lo lleva a ser perseguido por un asesino implacable en el oeste de Texas.",
    guionista: "Joel Coen, Ethan Coen",
    actores: "Javier Bardem, Josh Brolin, Tommy Lee Jones",
    calificacionGeneral: 5,
    userRating: 4,
    criticas: [
      { usuario: "ThrillerLover", haceCuanto: "Hace 2 semanas", texto: "Una obra maestra del thriller. La tensión es palpable y las actuaciones son brillantes." }
    ]
  },
  {
    titulo: "Vicky Cristina Barcelona",
    imagen: "/vicky.jpg",
    descripcion: "Dos amigas estadounidenses, Vicky y Cristina, pasan sus vacaciones de verano en Barcelona. Ambas se involucran románticamente con el mismo pintor, Juan Antonio, cuya ex-esposa, la volátil María Elena, reaparece en escena.",
    año: "2008",
    genero: "Comedia, Drama, Romance",
    director: "Woody Allen",
    guionista: "Woody Allen",
    actores: "Javier Bardem, Penélope Cruz, Scarlett Johansson, Rebecca Hall",
    calificacionGeneral: 4,
    userRating: 3,
    criticas: [
      {
        usuario: "Viajero",
        haceCuanto: "Hace 2 semanas",
        texto: "Una película encantadora con un hermoso telón de fondo. Las actuaciones son excelentes y la historia es ligera pero reflexiva."
      }
    ]
  },
  {
    titulo: "El Señor de los Anillos",
    imagen: "/lotr.webp",
    genero: "Fantasía",
    año: "2001",
    director: "Peter Jackson",
    slug: "el-senor-de-los-anillos",
    descripcion: "La trilogía cinematográfica El Señor de los Anillos, dirigido por Peter Jackson, adapta la obra de J.R.R. Tolkien en tres épicas entregas: La Comunidad del Anillo, Las Dos Torres y El Retorno del Rey. Ambientada en la Tierra Media, sigue la misión del hobbit Frodo Bolsón para quemar el Anillo Único, una joya de poder absoluto creado por el señor oscuro Sauron. Acompañado de un grupo de amigos (humanos, elfos, enanos, hobbits y otros hobbits) – Frodo enfrenta batallas, traiciones y sacrificios en una lucha entre el bien y el mal que marcó un antes y un después en el cine fantástico.",
    guionista: "Fran Walsh, Philippa Boyens, Peter Jackson",
    actores: "Elijah Wood, Ian McKellen, Viggo Mortensen, Orlando Bloom",
    calificacionGeneral: 5,
    userRating: 5,
    criticas: [
      {
        usuario: "TolkienFan",
        haceCuanto: "Hace 1 día",
        texto: "Una adaptación magistral. Captura la esencia de los libros y expande el mundo de Tolkien de una manera visualmente impresionante. ¡Imprescindible!"
      },
      {
        usuario: "CineCritico",
        haceCuanto: "Hace 5 días",
        texto: "Épica en todos los sentidos. La escala, los personajes, la banda sonora... todo se combina para crear una experiencia cinematográfica inolvidable."
      }
    ]
  },
  {
    titulo: "Lilo y Stitch",
    imagen: "/lilo.jpg",
    descripcion: "Lilo, una solitaria niña hawaiana, adopta a un 'perro' al que llama Stitch. Stitch es en realidad un experimento genético fugitivo del espacio exterior. Juntos, Lilo y Stitch aprenden sobre la amistad, la familia y lo que significa 'Ohana'.",
    año: "2002",
    genero: "Animación, Ciencia Ficción",
    director: "Dean DeBlois, Chris Sanders",
    guionista: "Chris Sanders, Dean DeBlois",
    actores: "Daveigh Chase, Chris Sanders, Tia Carrere",
    calificacionGeneral: 4,
    userRating: 5,
    criticas: [
      {
        usuario: "FanDeDisney",
        haceCuanto: "Hace 3 horas",
        texto: "¡Una película adorable! La mezcla de comedia y momentos emotivos es perfecta. Stitch es un personaje icónico."
      }
    ]
  },
  {
    slug: "el-padrino",
    titulo: "El Padrino",
    imagen: "/padrino.jpg",
    descripcion: "Un clásico atemporal del cine de gánsteres, dirigido por Francis Ford Coppola. Narrar la saga de la familia Corleone bajo el liderazgo de Vito Corleone, y la transformación de su hijo Michael en un despiadado jefe de la mafia. Explora temas de familia, poder, lealtad y traición en el oscuro mundo del crimen organizado de Nueva York.",
    año: "1972",
    genero: "Drama, Crimen",
    director: "Francis Ford Coppola",
    guionista: "Mario Puzo, Francis Ford Coppola",
    actores: "Marlon Brando, Al Pacino, James Caan",
    calificacionGeneral: 5,
    userRating: 4,
    criticas: [
      {
        usuario: "CriticoDeCine",
        haceCuanto: "Hace 1 día",
        texto: "Una obra maestra indiscutible. Cada escena es icónica y las actuaciones son legendarias. Una película que define un género."
      }
    ]
  },
];

export default function MovieDetailPage({ params }) {
  const router = useRouter();
  const { slug } = params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (slug) {
      const foundMovie = allMoviesData.find(m => m.slug === slug);
      setMovie(foundMovie);
      if (!foundMovie) {
        router.push("/404");
      }
    }
  }, [slug, router]);

  if (!movie) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white flex items-center justify-center">
        <p>Cargando detalles de la película...</p>
      </main>
    );
  }

  const handleAddComment = () => {
    console.log("Botón 'Agregar Comentario' clickeado para:", movie.titulo);
    // Aquí iría la lógica para abrir un modal, redirigir a una página de comentarios,
    // o mostrar un formulario para que el usuario escriba su comentario.
    // Usamos un alert temporal, pero recuerda que en un entorno real de Canvas
    // se prefiere un modal o UI personalizada en lugar de alert().
    alert("¡Funcionalidad para agregar comentarios en desarrollo!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-6 py-8">
      {/* Contenedor principal del layout: 3 columnas y 3 filas en pantallas grandes */}
      {/* Definimos un grid con 3 columnas y 3 filas para controlar el posicionamiento */}
      {/* La cuadrícula ahora tiene 3 filas principales, y la celda (3,1) se divide internamente */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-4"> {/* Cambiado gap-8 a gap-4 */}

        {/* 1. IMAGEN DE LA PELÍCULA (Columna 1, Fila 1) */}
        {/* La imagen abarca las filas 1 y 2 para permitir que los detalles estén debajo. */}
        <div className="lg:col-start-1 lg:row-start-1 flex justify-center lg:justify-start">
          <Image
            src={movie.imagen}
            alt={movie.titulo}
            width={350} // Ampliado el ancho
            height={525} // Ampliado la altura (manteniendo la proporción 2:3)
            className="rounded-lg shadow-lg object-cover"
            priority
          />
        </div>

        {/* 2. TÍTULO Y DESCRIPCIÓN (Columnas 2 y 3, Fila 1) */}
        <div className="lg:col-span-2 lg:col-start-2 lg:row-start-1 flex flex-col items-center lg:items-start">
          <h1 className="text-4xl font-bold mb-4 text-center lg:text-left">{movie.titulo}</h1>
          <p className="text-lg text-gray-300 leading-relaxed text-center lg:text-left">{movie.descripcion}</p>
        </div>

        {/* 3. DETALLES (Columna 1, Fila 2) */}
        {/* Se posiciona en la fila 2, debajo de la imagen. */}
        <div className="lg:col-start-1 lg:row-start-2 flex flex-col items-center lg:items-start w-full">
          <div className="text-center lg:text-left w-full bg-black/30 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">DETALLES</h3>
            <p><span className="font-bold">AÑO:</span> {movie.año}</p>
            <p><span className="font-bold">GÉNERO:</span> {movie.genero}</p>
            <p><span className="font-bold">DIRECTOR:</span> {movie.director}</p>
            <p><span className="font-bold">GUIONISTA:</span> {movie.guionista}</p>
            <p><span className="font-bold">ACTORES:</span> {movie.actores}</p>
          </div>
        </div>

        {/* 4. CUADRO DE COMENTARIOS (Columna 2, Fila 2) */}
        {/* Se posiciona en la fila 2, alineado con Detalles y Butaca Crítica. */}
        <div className="lg:col-start-2 lg:row-start-2 flex flex-col gap-8">
          <div className="bg-black/30 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">¡Deja tu huella!</h2> {/* Título creativo */}
            <textarea
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Escribe tu comentario aquí..."
            ></textarea>
            {/* Botón para agregar comentarios */}
            <button
              onClick={handleAddComment}
              className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Agregar Comentario
            </button>
          </div>
        </div>

        {/* 5. BUTACA CRÍTICA (Columna 3, Fila 2 y abarca hasta Fila 3) */}
        {/* Ahora Butaca Crítica empieza en la fila 2 y abarca 2 filas para alinearse con el cuadro de comentarios y el capybara. */}
        <div className="lg:col-start-3 lg:row-start-2 lg:row-span-2 flex flex-col gap-4 w-full">
          <div className="bg-black/30 p-6 rounded-lg shadow-md flex-grow"> {/* flex-grow para llenar el espacio vertical */}
            <h2 className="text-2xl font-bold mb-4 text-center">BUTACA CRÍTICA</h2>
            <div className="space-y-6">
              {movie.criticas.map((critica, idx) => (
                <div key={idx} className="border-b border-gray-700 pb-4 last:border-b-0">
                  <p className="font-semibold text-purple-300">{critica.usuario} <span className="text-gray-400 text-sm">{critica.haceCuanto}</span></p>
                  <p className="mt-1 text-gray-200 leading-snug">{critica.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. CONTENEDOR PARA CALIFICACIÓN GENERAL Y TU CALIFICACIÓN (Columna 1, Fila 3) */}
        {/* Este div ahora contiene ambas secciones de calificación, organizadas en un flex-col */}
        <div className="lg:col-start-1 lg:row-start-3 flex flex-col gap-4 w-full"> {/* Cambiado gap-8 a gap-4 */}
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
              {movie.calificacionGeneral === 5 ? "¡Supercapyrecomendable!" : "Capyrecomendable"}
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
              {movie.userRating === 5 ? "¡Supercapyrecomendable!" : "Capyrecomendable"}
            </p>
          </div>
        </div>

        {/* 7. CAPYBARA (Columna 2, Fila 3) */}
        {/* El capybara ahora ocupa la celda (2,3) */}
        <div className="lg:col-start-2 lg:row-start-3 flex justify-center items-end mt-auto">
          <Image
            src="/CapyCientifico.png" // Asegúrate de que esta imagen exista en tu carpeta public/
            alt="Capybara Científico"
            width={400}
            height={200}
            className="transform scale-x-[-1]" // Voltear horizontalmente
            onError={(e) => console.error("Error cargando Capybara Científico:", e.currentTarget.src)}
          />
        </div>
      </div>

      {/* Footer con logo (opcional, si no lo maneja el layout global) */}
      <footer className="mt-16 text-center">
        <Image
          src="/CapybaraOriginal.png" // O tu logo de footer si es diferente
          alt="Logo CineConecta"
          width={100}
          height={100}
          className="mx-auto"
        />
      </footer>
    </main>
  );
}