/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.entropiefestival.de',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
