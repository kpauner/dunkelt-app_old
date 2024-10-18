import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "static.wikia.nocookie.net" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "media.dunkelt.app" },
      { hostname: "backend.dunkelt.app" },
    ],
  },
};

export default withNextIntl(nextConfig);
