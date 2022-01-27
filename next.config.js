/** @type {import('next').NextConfig} */

const API_KEY = process.env.NEXT_PUBLIC_KEY;
const BASIC_URL = "https://api.themoviedb.org/3/movie";

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact/:id*",
        destination: "/path/:id*",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `${BASIC_URL}/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `${BASIC_URL}/:id?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
