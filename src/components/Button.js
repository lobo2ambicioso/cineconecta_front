// src/app/components/Button.js
export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded transition duration-300"
    >
      {children}
    </button>
  );
}