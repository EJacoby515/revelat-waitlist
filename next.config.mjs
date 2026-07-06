/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      // Serve the self-contained Brand DNA page at a clean /brandDNA path.
      { source: '/brandDNA', destination: '/brandDNA/index.html' },
    ];
  },
};

export default nextConfig;
