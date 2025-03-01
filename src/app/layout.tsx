import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";



const NyghtLite = localFont({
  src: "./font/NyghtSerif-Light.ttf",
  variable: "--font-BaseNeue",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ICP",
  description: "Individual Career Plan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={NyghtLite.className}>{children}</body>
    </html>
  );
}
