import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Floor Vision - See Your New Floor Before You Buy",
  description: "AI-powered floor visualization. Upload a photo of your room and see exactly how it looks with your chosen flooring. Get instant quotes from Solidstep Group.",
  keywords: ["floor renovation", "flooring quotes", "AI floor visualization", "hardwood flooring", "tile installation", "carpet installation", "laminate flooring", "vinyl flooring", "Floor Vision", "Solidstep Group"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a]`}
      >
        <Header />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
