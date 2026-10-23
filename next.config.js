/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    const noIndexHeaders = [
      {
        key: "X-Robots-Tag",
        value: "noindex, nofollow, noarchive",
      },
    ];

    return [
      {
        source: "/api/:path*",
        headers: noIndexHeaders,
      },
      {
        source: "/afnans.pdf",
        headers: noIndexHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
