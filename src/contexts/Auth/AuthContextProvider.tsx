"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AuthContext, AuthObj } from "@/contexts/Auth/AuthContext";
import validator from "validator";
import { jwtDecode } from "jwt-decode";
import { jwtPayloadParser } from "@/utils/zod-valids";

export default function AuthContextProvider({
  children,
  accessToken,
}: {
  children: React.ReactNode;
  accessToken: string;
}) {
  const [authState, setAuthState] = useState<AuthObj>({ auth: "loading" });

  const signInUser = useCallback((token: string) => {
    if (!validator.isJWT(token)) {
      // console.log("Invalid JWT");
      resetAuth();
      return;
    }
    const parserResult = jwtPayloadParser.safeParse(jwtDecode(token));
    if (parserResult.error) {
      // console.log("Invalid JWT PAYLOAD");
      resetAuth();
      return;
    }
    const parsedData = parserResult.data;
    setAuthState({
      auth: true,
      accessToken: token,
      userInfo: parsedData,
    });
    return;
  }, []);

  useEffect(() => {
    signInUser(accessToken);
  }, [accessToken, signInUser]);

  const resetAuth = () => {
    setAuthState({ auth: false });
  };

  return (
    <AuthContext.Provider value={{ authObj: authState, resetAuth, signInUser }}>
      {children}
    </AuthContext.Provider>
  );
}
