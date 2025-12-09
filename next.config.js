/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true, // Add this for better static export compatibility
  
  // Expose environment variables to client-side code
  env: {
    VILLA_PHONE: process.env.VILLA_PHONE,
    VILLA_SECONDARY_PHONE: process.env.VILLA_SECONDARY_PHONE,
    VILLA_EMAIL: process.env.VILLA_EMAIL,
    VILLA_SECONDARY_EMAIL: process.env.VILLA_SECONDARY_EMAIL,
    VILLA_WHATSAPP: process.env.VILLA_WHATSAPP,
    VILLA_WEBSITE: process.env.VILLA_WEBSITE,
    VILLA_NAME: process.env.VILLA_NAME,
    VILLA_LOCATION: process.env.VILLA_LOCATION,
    GOOGLE_SHEETS_SCRIPT_URL: process.env.GOOGLE_SHEETS_SCRIPT_URL,
    GOOGLE_AVAILABILITY_SCRIPT_URL: process.env.GOOGLE_AVAILABILITY_SCRIPT_URL,
  },
  
  // Remove exportPathMap as it's not compatible with App Router
};

module.exports = nextConfig;
