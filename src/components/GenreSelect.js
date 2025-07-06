import React from 'react';

export function GenreSelect({ onGenreChange, className = "" }) {
  const genres = [
    { id: "28", name: "Acción" },
    { id: "12", name: "Aventura" },
    { id: "16", name: "Animación" },
    { id: "35", name: "Comedia" },
    { id: "80", name: "Crimen" },
    { id: "99", name: "Documental" },
    { id: "18", name: "Drama" },
    { id: "10751", name: "Familia" },
    { id: "14", name: "Fantasía" },
    { id: "36", name: "Historia" },
    { id: "27", name: "Terror" },
    { id: "10402", name: "Musical" },
    { id: "9648", name: "Misterio" },
    { id: "10749", name: "Romance" },
    { id: "878", name: "Ciencia ficción" },
    { id: "10770", name: "Película de TV" },
    { id: "53", name: "Thriller" },
    { id: "10752", name: "Bélico" },
    { id: "37", name: "Western" },
  ];

  return (
    <select
      className={className}
      onChange={(e) => onGenreChange(e.target.value)}
      defaultValue=""
    >
      <option value="" disabled>
        Selecciona un género
      </option>
      {genres.map((g) => (
        <option key={g.id} value={g.id}>
          {g.name}
        </option>
      ))}
    </select>
  );
}