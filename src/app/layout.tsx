import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noor - Global Islamic Prayer Timings",
  description: "Accurate prayer timings for every city worldwide. Optimized for search engines and daily use.",
  manifest: "/manifest.json",
};

import ClientWrapper from "@/components/ClientWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-[#D4AF37]/30`}>
        {children}
      </body>
    </html>
  );
}
