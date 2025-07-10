"use client";

import React from "react";
import { UserCircle, LogOut } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
}

interface MenuProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  email: string;
  achievements?: Achievement[];
}

const Menu = ({ setOpen, userName, email, achievements = [] }: MenuProps) => {
  const handleLogout = () => {
    localStorage.removeItem("Auth_token");
    window.location.href = "/"; // 🔄 Redirige y recarga
  };

  return (
    <div className="flex fixed w-screen h-screen z-10">
      {/* Fondo oscuro */}
      <div
        className="h-full w-4/6 bg-gradient-to-r from-black to-purple-950 opacity-70"
        onClick={() => setOpen(prev => !prev)}
      />

      {/* Panel derecho */}
      <div className="h-full w-2/6 bg-gradient-to-t from-purple-950 to-purple-900 text-white p-4 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          {/* Usuario */}
          <div className="flex items-center space-x-3 border-b border-purple-700 pb-4 pt-24">
            <UserCircle size={48} />
            <div>
              <p className="font-semibold text-lg">{userName}</p>
              <p className="text-sm text-purple-300">{email}</p>
            </div>
          </div>

          {/* Logros */}
          <div>
            <h2 className="text-xl font-bold mb-2">Logros</h2>
            <ul className="space-y-2">
              {achievements.length > 0 ? (
                achievements.map(logro => (
                  <li
                    key={logro.id}
                    className="bg-purple-800 p-3 rounded-md shadow"
                  >
                    <p className="font-medium">{logro.title}</p>
                    <p className="text-sm text-purple-300">
                      {logro.description}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-sm text-purple-400">No hay logros aún.</p>
              )}
            </ul>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Menu;
