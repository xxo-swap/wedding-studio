/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "grhmpdmglnevoaamsrcz.supabase.co",
        port: '',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  }
};

export default nextConfig;
