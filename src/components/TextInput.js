// src/app/components/TextInput.js
export default function TextInput({ label, name, type = "text" }) {
  return (
    <div className="flex flex-col text-white">
      <label htmlFor={name} className="mb-1">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        className="px-3 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
    </div>
  );
}
