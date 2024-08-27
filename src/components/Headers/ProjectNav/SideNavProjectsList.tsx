"use client";

import myRoutes from "@/utils/myRoutes";
import { GetProjectListReturn } from "@/utils/queryfns/getProjectList";

import Link from "next/link";

type props = {
  projectList: GetProjectListReturn | undefined;
  isFetchingProjectList: boolean;
};

export default function SideNavProjectsList({
  projectList,
  isFetchingProjectList,
}: props) {
  if (isFetchingProjectList) {
    return <div className="pl-3.5 pr-5 py-2.5 font-medium">loading..</div>;
  }

  return projectList?.length
    ? projectList.map((proj) => (
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
