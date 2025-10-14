import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your App",
  description: "Your app description",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Your App",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Your App",
    title: "Your App",
    description: "Your app description",
  },
  twitter: {
    card: "summary",
    title: "Your App",
    description: "Your app description",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        dir="rtl"
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-[#b8a989]`}
      >
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
