import AuthedHeader from "@/components/Headers/AuthedHeader";
import SideUserNav from "@/components/Headers/SideUserNav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthedHeader />
      <div className="flex h-fit">
        <SideUserNav />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}
