/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// module.exports = nextConfig
module.exports = {
  output: "standalone",
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/auth/register",
        permanent: true,
      },
    ];
  },
};
