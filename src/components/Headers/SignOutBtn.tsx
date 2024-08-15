"use client";

import signOut from "@/actions/signOut";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import myRoutes from "@/utils/myRoutes";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/utils/query-keys";

export default function SignOutBtn() {
  const { resetAuth } = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  const onClick = async () => {
    try {
      const { success } = await signOut();
      if (success) {
        resetAuth();
        router.push(myRoutes.home.path);
        setTimeout(() => {
          queryClient.removeQueries({
            queryKey: queryKeys.projectList.slice(0, 1),
            exact: false,
          });
          queryClient.removeQueries({
            queryKey: queryKeys.archivesList.slice(0, 1),
            exact: false,
          });
        }, 1500);
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
