
const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: "standalone",
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return [
      {
        source: "/contact-us/about-us",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;