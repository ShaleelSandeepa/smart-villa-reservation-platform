import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Villa Shaa - Luxury Villa in Hikkaduwa | Mr. Leel Indika",
  description:
    "Experience luxury at Villa Shaa, a stunning villa in Hikkaduwa with garden, and premium amenities. Book your perfect getaway today.",
  keywords:
    "VillaShaa, villa shaa, villa, hikkaduwa, luxury accommodation, garden, sri lanka, villa rental, holiday home, beach villa, private villa, family vacation, romantic getaway, travel, tourism, Sri Lanka tourism, Leel Indika",
  icons: {
    icon: [
      { url: '/favicons/rounded-rectangle-logo-vs.png' },
      { url: "/favicons/rounded-logo-rectangle-vs-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/rounded-logo-rectangle-vs-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicons/site.webmanifest",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicons/rounded-rectangle-logo-vs.png" sizes="any" />
        <meta name="google-site-verification" content="hdy8ndyAxrjOZJ6jZe5SoazPU5EiomfcOuoHdd3mMYM" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}