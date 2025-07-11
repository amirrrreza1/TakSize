/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.taksize.com",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
