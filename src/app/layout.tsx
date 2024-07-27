import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  fallback: ["geneva", "verdana", "sans-serif"],
});

export const metadata: Metadata = {
  title: "TSKR",
  description: "A simple task management app",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito_sans.className}>{children}</body>
    </html>
  );
}
