import AuthedHeader from "@/components/Headers/AuthedHeader";
// import ProjectNav from ;
import dynamic from "next/dynamic";
import React from "react";

const ProjectNav = dynamic(
  () => import("@/components/Headers/ProjectNav/ProjectNav"),
  { ssr: false }
);

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthedHeader />
      <div className="flex h-fit">
        <ProjectNav />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}
