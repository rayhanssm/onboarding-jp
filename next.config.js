/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// module.exports = nextConfig
module.exports = {
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
