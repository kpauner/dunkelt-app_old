import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "static.wikia.nocookie.net" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "placehold.co" },
    ],
  },
};

export default withNextIntl(nextConfig);
