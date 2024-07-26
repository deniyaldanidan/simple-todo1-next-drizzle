"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth/AuthContext";

export default function useAuthContext() {
  return useContext(AuthContext);
}
