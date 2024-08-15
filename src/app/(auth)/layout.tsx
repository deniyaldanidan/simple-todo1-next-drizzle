import React from "react";
import AuthGuard from "@/components/Auth/AuthGuard";
import myRoutes from "@/utils/myRoutes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard authState={true} redirectPath={myRoutes.signIn.path}>
      {children}
    </AuthGuard>
  );
}
