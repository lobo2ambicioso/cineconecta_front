"use client";
import Image from "next/image";
import Logo from "../../public/jpg/logo.jpg";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { User } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Menu from "./menu";
import { decodeJwt } from "@/utils/jwtDecode";

interface LayoutBaseProps {
  children: ReactNode;
}

const LayoutBase = ({ children }: LayoutBaseProps) => {
  const { user, userName, setUser, setUserName, email, setEmail } = useAuth();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Auth_token");
    if (token) {
      const data = decodeJwt(token);

      setUser("Auth");
      setUserName(data?.name ?? null);
      setEmail(data?.email ?? null);
    }
  }, [user, setUser, setUserName, setEmail]);

  const Home = () => {
    router.push("/");
  };

  const Login = () => {
    router.push("/login");
  };

  const Register = () => {
    router.push("/register");
  };

  const Catalog = () => {
    router.push("/catalog");
  };

  return (
    <main>
      {openMenu && (
        <Menu setOpen={setOpenMenu} userName={userName!} email={email!} />
      )}
      <section className="fixed flex w-full items-center justify-between bg-black py-3 px-6 z-10">
        <Image
          src={Logo}
          alt="Logo"
          onClick={Home}
          className="cursor-pointer"
        />
        {user == "Auth" && (
          <Button
            text="Catalog"
            color="#fff"
            bordercolor="#8200db"
            bgcolor="#8200db"
            onClick={Catalog}
          />
        )}

        {user != "Auth" ? (
          <div className="flex gap-2 items-center  justify-center ">
            <Button
              text="Login"
              color="#ffff"
              bordercolor="#ffff"
              onClick={Login}
            />
            <Button
              text="Register"
              color="#ffff"
              bordercolor="#ffff"
              onClick={Register}
            />
          </div>
        ) : (
          <div
            className="flex gap-4 items-center rounded-lg px-4 py-2 cursor-pointer"
            onClick={() => setOpenMenu(prev => !prev)}
          >
            <div className="bg-purple-700 p-2 rounded-full">
              <User className="text-white" />
            </div>
            <span className="text-white">{userName}</span>
          </div>
        )}
      </section>
      <section className="pt-20">{children}</section>

      <section className="bg-black py-10 px-4 sm:px-20">
        <div className="flex justify-center">
          <Image src={Logo} alt="logo" />
        </div>

        <div className="max-w-3xl mx-auto space-y-4 text-left text-sm sm:text-base">
          <details className="border-b border-white py-2">
            <summary className="cursor-pointer text-white">
              ¿Cómo me registro en CineConecta?
            </summary>
            <p className="mt-2 text-gray-300">
              En la parte superior de la página principal o de inicio, del lado
              derecho se encuentran los botones ‘Registrarse’ e ‘Ingresar’. Al
              dar clic en ‘Registrarse’ se abrirá un formulario donde ingresarás
              tu nombre, apellido, correo y contraseña. Al dar clic en
              ‘Registrarse’, quedarás registrado en CineConecta.
            </p>
          </details>

          <details className="border-b border-white py-2">
            <summary className="cursor-pointer text-white">
              ¿Qué funciones ofrece mi perfil?
            </summary>
            <p className="mt-2 text-gray-300">
              Al tener perfil en CineConecta tendrás acceso a la búsqueda de
              películas por título o filtros como género, año o director.
              Adicionalmente, en cada película podrás calificarla, dar tu
              opinión y visualizar la calificación global y reseñas de otros
              usuarios.
            </p>
          </details>

          <details className="border-b border-white py-2">
            <summary className="cursor-pointer text-white">
              ¿Cómo califico y reseño una película?
            </summary>
            <p className="mt-2 text-gray-300">
              Al encontrar la película que deseas calificar o reseñar usando la
              función de búsqueda, debajo de la descripción y los datos de la
              película encontrarás íconos de estrellas. Con ellos podrás
              calificar la película según la cantidad de estrellas que
              selecciones. Y del lado derecho de la ventana encontrarás un
              cuadro de texto donde podrás dejar tu opinión.
            </p>
          </details>

          <details className="border-b border-white py-2">
            <summary className="cursor-pointer text-white">
              ¿CineConecta tiene un costo?
            </summary>
            <p className="mt-2 text-gray-300">
              Para satisfacción de nuestros usuarios, CineConecta es
              completamente ¡GRATIS! Entonces, ¿qué esperas para empezar a
              calificar y opinar sobre películas en nuestra plataforma?
            </p>
          </details>
        </div>
      </section>
    </main>
  );
};

export default LayoutBase;
