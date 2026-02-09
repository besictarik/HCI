import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pdleosceaskbtpgvvfbg.storage.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default withPayload(nextConfig);
