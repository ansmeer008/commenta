/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: isDev
              ? "*" // dev에서는 편의상 모두 허용
              : "https://commenta-hazel.vercel.app",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
  images: {
    domains: ["firebasestorage.googleapis.com"], // 외부 이미지 허용 도메인
  },
};

module.exports = nextConfig;
