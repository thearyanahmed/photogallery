// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "benchmarkap.lon1.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/fractals/**",
        search: "",
      },
    ],
  },
  experimental: {
    largePageDataBytes: 150 * 1024 * 1024, // 150 MB limit
  },
};
