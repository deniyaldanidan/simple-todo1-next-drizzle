import React from "react";
import AuthGuard from "@/components/Auth/AuthGuard";
import myRoutes from "@/utils/myRoutes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard authState={false} redirectPath={myRoutes.appHome.path}>
      {children}
    </AuthGuard>
  );
}
