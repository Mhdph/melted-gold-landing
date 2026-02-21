import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import "./globals.css";

import { Providers } from "@/components/provider";

export const metadata: Metadata = {
  title: "طلای آب‌شده زروان",
  description: "طلای آب‌شده زروان",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "طلای آب‌شده زروان",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "طلای آب‌شده زروان",
    title: "طلای آب‌شده زروان",
    description: "طلای آب‌شده زروان",
  },
  twitter: {
    card: "summary",
    title: "طلای آب‌شده زروان",
    description: "طلای آب‌شده زروان",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
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
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-[#000e1f]`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>{children}</Providers>
        </Suspense>
        <Toaster />
        <SonnerToaster />
        <Analytics />
      </body>
    </html>
  );
}
