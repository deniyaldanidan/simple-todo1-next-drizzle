"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import ProjMobileSideNav from "@/components/Headers/ProjectNav/ProjMobileSideNav";
import SideNav from "@/components/Headers/ProjectNav/SideNav";
import queryKeys from "@/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import getProjectList from "@/utils/queryfns/getProjectList";

export default function ProjectNav() {
  const { authObj } = useAuthContext();
  const { data: projectList, isFetching: isFetchingProjectList } = useQuery({
    queryKey: queryKeys.projectList,
    queryFn: () =>
      getProjectList(authObj.auth === true ? authObj.accessToken : ""),
    enabled: authObj.auth === true,
    refetchOnMount: "always",
  });

  const match = useMediaQuery("(max-width: 900px)");

  return match ? (
    <ProjMobileSideNav {...{ projectList, isFetchingProjectList }} />
  ) : (
    <SideNav {...{ projectList, isFetchingProjectList }} />
  );
}
