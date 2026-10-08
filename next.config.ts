import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "psibethaniasaraiva.com.br",
          },
        ],
        destination: "https://www.psibethaniasaraiva.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
