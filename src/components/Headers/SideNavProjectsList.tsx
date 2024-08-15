"use client";

import useAuthContext from "@/contexts/Auth/useAuthContext";
import getProjectList from "@/utils/queryfns/getProjectList";
import myRoutes from "@/utils/myRoutes";
import queryKeys from "@/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function SideNavProjectsList() {
  const { authObj } = useAuthContext();
  const { data, isFetching } = useQuery({
    queryKey: queryKeys.projectList,
    queryFn: () =>
      getProjectList(authObj.auth === true ? authObj.accessToken : ""),
    enabled: authObj.auth === true,
    refetchOnMount: "always",
  });

  if (isFetching) {
    return <div className="pl-3.5 pr-5 py-2.5 font-medium">loading..</div>;
  }

  return data?.length
    ? data.map((proj) => (
        <Link
          href={myRoutes.viewProject.path(proj.projectId)}
          className="side-nav-link flex items-center gap-x-2"
          key={proj.projectId}
        >
          <span
            className="block w-3.5 h-3.5 rounded-full border-gray-300 border"
            style={{ backgroundColor: proj.projectColorCode }}
          ></span>
          <span>{proj.projectName}</span>
        </Link>
      ))
    : "";
}
