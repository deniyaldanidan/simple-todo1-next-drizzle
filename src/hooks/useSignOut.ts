"use client";

import signOut from "@/actions/signOut";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import myRoutes from "@/utils/myRoutes";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/utils/query-keys";

export default function useSignOut() {
  const { resetAuth } = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  return async () => {
    try {
      const { success } = await signOut();
      if (success) {
        router.push(myRoutes.signIn.path);
        resetAuth();
        setTimeout(() => {
          queryClient.removeQueries({
            queryKey: queryKeys.projectList.slice(0, 1),
            exact: false,
          });
          queryClient.removeQueries({
            queryKey: queryKeys.archivesList.slice(0, 1),
            exact: false,
          });
          queryClient.removeQueries({
            queryKey: queryKeys.userInfo.slice(0, 1),
            exact: false,
          });
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
