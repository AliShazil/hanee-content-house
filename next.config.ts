import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Testimonial photos uploaded from the admin dashboard live in Vercel Blob.
    remotePatterns: [new URL("https://*.public.blob.vercel-storage.com/**")],
  },
};

export default nextConfig;
