import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VeraForge | Virtual Internship Management Platform",
  description: "Enterprise-grade automated virtual internship tracking, evaluation, and verified credentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#10b981', // emerald-500
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      >
        <body className="min-h-full flex flex-col bg-cyber-navy-dark text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
