// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'CineConecta',
  description: 'Tu espacio para conectar con el cine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-[#100d1c] text-white font-sans">{children}</body>
    </html>
  );
}
