/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clonex-assets.rtfkt.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
