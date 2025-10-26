/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb"
    }
  }
  /* config options here */
};

export default nextConfig;
