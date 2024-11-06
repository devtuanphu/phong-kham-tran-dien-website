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
        hostname: "208.113.133.157",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https", // Nếu bạn dùng https
        hostname: "admin.phongkhamkhoadien.vn", // Giả sử bạn có dùng subdomain
        pathname: "/uploads/**", // Đảm bảo đúng đường dẫn cho ảnh
      },
    ],
  },
};

export default nextConfig;
