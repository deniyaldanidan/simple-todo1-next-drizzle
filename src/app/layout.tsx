import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import refresh from "@/actions/refresh";
import AuthContextProvider from "@/providers/AuthContextProvider";
import QueryProvider from "@/providers/QueryProvider";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const refreshObj = await refresh();
  if (!refreshObj.success && refreshObj.error) {
    throw new Error(refreshObj.errMsg);
  }
  return (
    <html lang="en">
      <body className={nunito_sans.className}>
        <AuthContextProvider
          accessToken={refreshObj.success ? refreshObj.token : ""}
        >
          <QueryProvider>{children}</QueryProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
