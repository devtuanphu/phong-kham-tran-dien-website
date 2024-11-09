/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_URL_BE: process.env.NEXT_PUBLIC_URL_BE,
    NEXT_PUBLIC_TOKEN_DEV: process.env.NEXT_PUBLIC_TOKEN_DEV,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "103.154.63.33",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "admin.phongkhamkhoadien.vn",
        port: "443",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
