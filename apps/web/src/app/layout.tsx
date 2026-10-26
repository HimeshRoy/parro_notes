import type { Metadata } from "next";

import AppShell from "@/components/layout/AppShell";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://parronotes.vercel.app"),

  title: {
    default: "Parro Notes — Free Study Notes for Students",
    template: "%s | Parro Notes",
  },

  description:
    "Parro Notes is a free learning platform where students can find study notes, subjects, topics, PDFs, and educational resources in one place.",

  keywords: [
    "Parro Notes",
    "free study notes",
    "student notes",
    "study notes",
    "class 10 notes",
    "CBSE notes",
    "ICSE notes",
    "WBBSE notes",
    "science notes",
    "maths notes",
    "physics notes",
    "chemistry notes",
    "educational resources",
    "free notes for students",
  ],

  authors: [
    {
      name: "Himesh Roy",
    },
  ],

  creator: "Himesh Roy",
  publisher: "Parro Notes",
  applicationName: "Parro Notes",

  alternates: {
    canonical: "https://parronotes.vercel.app",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://parronotes.vercel.app",
    siteName: "Parro Notes",
    title: "Parro Notes — Free Study Notes for Students",
    description:
      "Find free study notes, subjects, topics, and educational resources with Parro Notes.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Parro Notes — Free Study Notes for Students",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Parro Notes — Free Study Notes for Students",
    description:
      "Free study notes and educational resources for students.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fffdf8] text-[#202a31] antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}