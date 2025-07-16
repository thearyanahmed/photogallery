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
};
