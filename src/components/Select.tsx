import React, { useEffect, useState } from "react";

type option = { id: string; name: string };

interface SelectParams {
  options: option[];
  select: (id: string) => Promise<void>;
  className?: string;
}

const Select = ({ options, select, className = "" }: SelectParams) => {
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchByGenre = async () => {
      if (id !== "") {
        await select(id);
      }
    };

    fetchByGenre();
  }, [id]);

  return (
    <select
      className={`w-40 p-3 rounded-xl bg-[#2D2D44] text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200 shadow-sm ${className}`}
      onChange={e => setId(e.target.value)}
      value={id}
    >
      <option value="" disabled>
        Seleccionar
      </option>
      {options.map(g => (
        <option key={g.id} value={g.name}>
          {g.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
