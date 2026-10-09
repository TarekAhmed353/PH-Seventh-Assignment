import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Color_Emoji } from "next/font/google";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

const notoEmoji = Noto_Color_Emoji({
  variable: "--font-noto-emoji",
  subsets: ["emoji"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
  icons: { icon: "/logo-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="bazardor" className={`${hindSiliguri.variable} ${notoEmoji.variable}`}>
      <body className="min-h-screen bg-base-200 font-sans text-base-content antialiased">
        <Navbar />
        <Ticker />
        {children}
      </body>
    </html>
  );
}