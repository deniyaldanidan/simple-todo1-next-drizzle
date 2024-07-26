import AuthGuard from "@/components/Auth/AuthGuard";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
