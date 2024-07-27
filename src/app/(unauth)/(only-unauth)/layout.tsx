import React from "react";
import refresh from "@/actions/refresh";
import AuthGuard from "@/components/Auth/AuthGuard";
import AuthContextProvider from "@/contexts/Auth/AuthContextProvider";
import myRoutes from "@/utils/myRoutes";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const refreshObj = await refresh();
  if (!refreshObj.success && refreshObj.error) {
    throw new Error(refreshObj.errMsg);
  }
  return (
    <AuthContextProvider
      accessToken={refreshObj.success ? refreshObj.token : ""}
    >
      <AuthGuard authState={false} redirectPath={myRoutes.appHome.path}>
        {children}
      </AuthGuard>
    </AuthContextProvider>
  );
}

export const dynamic = "force-dynamic";
