/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: "5mb"
    }
  }
  /* config options here */
};

export default nextConfig;
