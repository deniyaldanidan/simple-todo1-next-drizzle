import AuthedHeader from "@/components/Headers/AuthedHeader";
import SideNav from "@/components/Headers/SideNav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthedHeader />
      <div className="flex h-fit">
        <SideNav />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}
