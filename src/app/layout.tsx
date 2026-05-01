import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CareerHub - Find Your Dream Career | Job Portal",
    template: "%s | CareerHub",
  },
  description:
    "Discover thousands of job opportunities from top companies worldwide. CareerHub connects talented professionals with their dream careers. Search jobs, get alerts, and advance your career.",
  keywords: [
    "job portal",
    "job search",
    "careers",
    "employment",
    "job listings",
    "remote jobs",
    "tech jobs",
    "career advice",
    "job alerts",
    "resume",
    "hiring",
  ],
  authors: [{ name: "CareerHub Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "CareerHub - Find Your Dream Career",
    description:
      "Discover thousands of job opportunities from top companies worldwide. Search, apply, and get hired.",
    siteName: "CareerHub",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerHub - Find Your Dream Career",
    description:
      "Discover thousands of job opportunities from top companies worldwide.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense - Replace with your actual client ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
