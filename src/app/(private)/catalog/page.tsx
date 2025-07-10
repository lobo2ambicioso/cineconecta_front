"use client";
import LayoutBase from "@/layout/layout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DeafultImg from "../../../../public/jpg/default image.jpg";
import Input from "@/components/Input";
import { api } from "@/lib/axiosInstance";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";

type option = { id: string; name: string };

interface Films {
  tmdbId: number;
  title: string;
  year: string;
  imageUrl: string;
}

const PageCatalog = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [films, setFilms] = useState<Array<Films>>();

  const handleSearch = async (query: string) => {
    try {
      const response = await api.get(
        `/cine/api/movies/search?query=${encodeURIComponent(query)}`
      );
      setFilms(response.data);
    } catch (error) {
      setFilms(undefined);
      console.log("Error al buscar películas:", error);
    }
  };

  const handleSearchByGenres = async (id: string) => {
    try {
      const response = await api.get(
        `/cine/api/movies/search?genre=${encodeURIComponent(id)}`
      );
      setFilms(response.data);
    } catch (error) {
      setFilms(undefined);
      console.log("Error al buscar películas:", error);
    }
  };

  const handleMovie = (id: number) => {
    console.log(id);
    router.push(`catalog/${id}`);
  };

  useEffect(() => {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    if (randomGenre) {
      handleSearchByGenres(randomGenre.id);
    }
  }, [search]);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  const genres: Array<option> = [
    { id: "28", name: "Accion" },
    { id: "12", name: "Aventura" },
    { id: "16", name: "Animacion" },
    { id: "35", name: "Comedia" },
    { id: "80", name: "Crimen" },
    { id: "99", name: "Documental" },
    { id: "18", name: "Drama" },
    { id: "10751", name: "Familia" },
    { id: "14", name: "Fantasia" },
    { id: "36", name: "Historia" },
    { id: "27", name: "Terror" },
    { id: "9648", name: "Misterio" },
    { id: "10749", name: "Romance" },
    { id: "878", name: "Ciencia ficcion" },
    { id: "53", name: "Thriller" },
    { id: "10752", name: "Belico" },
    { id: "37", name: "Western" },
  ];

  return (
    <main>
      <LayoutBase>
        <section className="z-0 bg-gradient-to-b from-black to-[#3C1A81]">
          <div className="flex justify-center items-center py-5 gap-5">
            <Input
              className="min-w-3xl min-h-12"
              placeholder="Search your favorite films"
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
            <Select options={genres} select={handleSearchByGenres} />
          </div>
          {search == "" ? (
            <>
              <div className="bg-purple-800 rounded-3xl mx-64 ">
                <h1 className="text-3xl font-semibold text-white py-5 px-20">
                  Recommendations
                </h1>
              </div>
              <div
                className={`min-h-92  ${
                  films != undefined &&
                  "grid grid-cols-4 gap-4 mx-32 mt-5 pb-16"
                }`}
              >
                {films == undefined ? (
                  <div>Film not Found</div>
                ) : (
                  films.map(film => (
                    <div
                      key={film.tmdbId}
                      className="bg-[#1E1B29] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-102 p-3 cursor-pointer "
                      onClick={() => handleMovie(film.tmdbId)}
                    >
                      <div className="relative w-full h-92 ">
                        <Image
                          src={film.imageUrl ? film.imageUrl : DeafultImg}
                          alt={film.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-xl "
                        />
                      </div>
                      <div className="p-4 text-white">
                        <h2 className="text-lg font-semibold truncate">
                          {film.title}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                          {film.year}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div
              className={`min-h-92  ${
                films != undefined && "grid grid-cols-5 gap-4 mx-10 mt-5 pb-16"
              }`}
            >
              {films == undefined ? (
                <div>Film not Found</div>
              ) : (
                films.map(film => (
                  <div
                    key={film.tmdbId}
                    className="bg-[#1E1B29] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-102 p-3 cursor-pointer "
                    onClick={() => handleMovie(film.tmdbId)}
                  >
                    <div className="relative w-full h-92 ">
                      <Image
                        src={film.imageUrl ? film.imageUrl : DeafultImg}
                        alt={film.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-xl "
                      />
                    </div>
                    <div className="p-4 text-white">
                      <h2 className="text-lg font-semibold truncate">
                        {film.title}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">{film.year}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </LayoutBase>
    </main>
  );
};

export default PageCatalog;
