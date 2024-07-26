"use client";

import React from "react";

type UnAuthedObj = {
  auth: false;
};

type LoadingAuthObj = {
  auth: "loading";
};

type AuthedObj = {
  auth: true;
  accessToken: string;
  userInfo: {
    userId: number;
    username: string;
    firstname: string;
    lastname: string;
  };
};

export type AuthObj = UnAuthedObj | LoadingAuthObj | AuthedObj;

export const AuthContext = React.createContext<{
  authObj: AuthObj;
  resetAuth: () => void;
  signInUser: (token: string) => void;
}>({
  authObj: {
    auth: "loading",
  },
  resetAuth: () => {},
  signInUser: (token: string) => {},
});
