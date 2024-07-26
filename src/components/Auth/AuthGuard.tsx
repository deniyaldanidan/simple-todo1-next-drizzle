"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import myRoutes from "@/utils/myRoutes";
import NotAuthedWarn from "./NotAuthedWarn";
import AuthLoading from "./AuthLoading";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { authObj } = useAuthContext();

  useEffect(() => {
    authObj.auth === false && router.replace(myRoutes.signIn.path);
  }, [authObj, router]);

  if (authObj.auth === "loading") {
    return <AuthLoading />;
  }

  return authObj.auth === true ? <>{children}</> : <NotAuthedWarn />;
}
