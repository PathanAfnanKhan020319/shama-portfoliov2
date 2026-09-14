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
        source: "/Resum_syeda_shamama_afeef123.pdf",
        headers: noIndexHeaders,
      },
      {
        source: "/afnans.pdf",
        headers: noIndexHeaders,
      },
      {
        source: "/dummy.pdf",
        headers: noIndexHeaders,
      },
      {
        source: "/shamama-resume-f.pdf",
        headers: noIndexHeaders,
      },
      {
        source: "/shamama.resumee.pdf",
        headers: noIndexHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
