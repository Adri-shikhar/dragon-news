/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongodb', 'better-auth', '@better-auth/mongo-adapter'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
