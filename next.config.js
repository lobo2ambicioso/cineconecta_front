// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**', // El pathname es importante para que coincida con la ruta de las imágenes de TMDb
      },
    ],
    //domains: ['image.tmdb.org'], // Add the TMDb image domain here
  },
  // Other Next.js configurations if you have them
};

module.exports = nextConfig;