"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import SideUserNav from "@/components/Headers/UserNav/SideUserNav";
import UserMobileSideNav from "@/components/Headers/UserNav/UserMobileSideNav";

export default function UserNav() {
  const match = useMediaQuery("(max-width: 900px)");

  return match ? <UserMobileSideNav /> : <SideUserNav />;
}
