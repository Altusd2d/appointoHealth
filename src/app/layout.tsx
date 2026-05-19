import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/hero/navbar";
import Footer from "@/components/footer/footer";

const font1 = localFont({
  src: "../fonts/font1.woff2",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appointohealth",
  description: "Book doctor appointments online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth relative ">
      <body
        suppressHydrationWarning
        className={` antialiased ${font1.className}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
