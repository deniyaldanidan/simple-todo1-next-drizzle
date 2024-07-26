import AuthedHeader from "@/components/Headers/AuthedHeader";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthedHeader />
      <main>{children}</main>
    </>
  );
}
