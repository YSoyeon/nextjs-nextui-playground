/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // source : 유저가 진입할 path
        // destination : 유저가 이동할 path
        source: '/:path((?!_next|en|ko).*)*', // en|ko로 시작하는 path 제외
        destination: '/ko/:path*',
      },
      {
        source: '/:path((?!_next|en|ko).*)*/', // en|ko로 시작하는 path 제외
        destination: '/ko/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
