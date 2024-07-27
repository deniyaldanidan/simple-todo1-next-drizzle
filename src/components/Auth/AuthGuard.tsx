"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import NotAuthedWarn from "@/components/Auth/NotAuthedWarn";
import AuthLoading from "@/components/Auth/AuthLoading";
import AuthedInfo from "@/components/Auth/AuthedInfo";

type props = {
  children: React.ReactNode;
  authState?: boolean;
  redirectPath: string;
};

export default function AuthGuard({
  children,
  authState = true,
  redirectPath,
}: props) {
  const router = useRouter();
  const { authObj } = useAuthContext();

  useEffect(() => {
    authObj.auth === !authState && router.replace(redirectPath);
  }, [authObj, router, authState, redirectPath]);

  if (authObj.auth === "loading") {
    return <AuthLoading />;
  }

  return authObj.auth === authState ? (
    <>{children}</>
  ) : authState === true ? (
    <NotAuthedWarn />
  ) : (
    <AuthedInfo />
  );
}
