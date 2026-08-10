import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The live site's old addresses, pointed at their equivalents in the rebuild.
   * The rest of the previous URL set has no counterpart here and is left to 404.
   */
  async redirects() {
    return [
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/our-work", destination: "/work", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-client", destination: "/about", permanent: true },
      { source: "/our-partners", destination: "/about", permanent: true },
      { source: "/life-walqalum", destination: "/about", permanent: true },
      { source: "/capabilities", destination: "/industries", permanent: true },
      { source: "/engagements", destination: "/industries", permanent: true },
      { source: "/services", destination: "/industries", permanent: true },
      { source: "/services/:slug", destination: "/industries", permanent: true },
    ];
  },
};

export default nextConfig;
