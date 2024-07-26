import BasicHeader from "@/components/Headers/BasicHeader";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BasicHeader />
      {/* Page Main Content */}
      <main className="min-h-screen">{children}</main>
      {/* Page Footer */}
      <footer className="flex justify-center items-center gap-x-2 px-page-margin-x py-5 bg-secHighBackground border-t-2 border-t-terBackground">
        <span className="text-secForeground text-base font-medium">
          &copy; 2024. Dani&apos;s products.
        </span>
        <span className="text-secForeground text-base font-medium">
          All rights reserved.
        </span>
      </footer>
    </>
  );
}
