import LayoutBase from "@/layout/layout";
import Image from "next/image";
import backgound from "../../public/jpg/background.jpg"
import mago from "../../public/jpg/mago.jpg";
import pirata from "../../public/jpg/pirata.jpg";
import samurai from "../../public/jpg/samurai.jpg";
import vikingo from "../../public/jpg/vikingo.jpg";
import agente from "../../public/jpg/agente.jpg"

export default function Home() {

  const images = [
    { img: mago, name: "mago" },
    { img: pirata, name: "pirata" },
    { img: samurai, name: "samurai" },
    { img: vikingo, name: "vikingo" },
    { img: agente, name: "agente" }
  ]

  return (
    <main className="">
      <LayoutBase>
        <section className="bg-gradient-to-b from-black to-[#3C1A81]">
          <Image className="h-96 object-cover" src={backgound} alt="background" />
          <div className="pb-16 px-56">
            <section className="mt-16 pt-16 px-44 w-full border-t-2 border-amber-50">
              <p className="text-amber-50 text-center">
                CineConecta es el espacio donde el cine cobra vida: descubre, califica y comparte tu pasión por las películas con una comunidad que vibra con cada historia.
              </p>
            </section>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-2 py-4 px-10 ">
            {images.map(img => (
              <Image key={img.name} src={img.img} alt={img.name} className="rounded-lg hover:shadow-md hover:shadow-blue-600 cursor-pointer transition-all duration-500" />
            ))}
          </div>
        </section>
      </LayoutBase>
    </main>
  );
}
