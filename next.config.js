/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["static.mundoeducacao.uol.com.br", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
