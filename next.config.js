/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    minimumCacheTTL: 180,
  },
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=180, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
