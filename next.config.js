/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["static.mundoeducacao.uol.com.br"],
  },
};

module.exports = nextConfig;
