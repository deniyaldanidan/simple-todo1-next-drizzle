import AuthedHeader from "@/components/Headers/AuthedHeader";
import UserNav from "@/components/Headers/UserNav/UserNav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthedHeader />
      <div className="flex h-fit">
        <UserNav />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}
