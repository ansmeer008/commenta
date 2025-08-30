/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // 외부 이미지 허용 도메인
  },
};

module.exports = nextConfig;
