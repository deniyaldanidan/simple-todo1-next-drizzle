"use client";

import signOut from "@/actions/signOut";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import myRoutes from "@/utils/myRoutes";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
  const { resetAuth } = useAuthContext();
  const router = useRouter();

  const onClick = async () => {
    try {
      const { success } = await signOut();
      if (success) {
        resetAuth();
        router.push(myRoutes.home.path);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button type="button" className="menu-link" onClick={onClick}>
      Sign Out
    </button>
  );
}
