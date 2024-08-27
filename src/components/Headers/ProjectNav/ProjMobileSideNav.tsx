"use client";

import MobileNavLink from "@/components/utils/MobileNavLink";
import myRoutes from "@/utils/myRoutes";
import { GetProjectListReturn } from "@/utils/queryfns/getProjectList";
import { useMemo, useRef } from "react";
import { MdAdd as AddIcon } from "react-icons/md";
import MobileSideNavContainer from "@/components/Headers/MobileNavContainer";

type props = {
  projectList: GetProjectListReturn | undefined;
  isFetchingProjectList: boolean;
};

export default function ProjMobileSideNav({
  isFetchingProjectList,
  projectList,
}: props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const dialogCloseFN = () => {
    dialogRef.current?.close();
  };

  const RenderProjectList = useMemo(() => {
    if (isFetchingProjectList) {
      return (
        <div className="text-dimForeground px-5 text-base font-semibold capitalize">
          loading...
        </div>
      );
    }
    return projectList?.length
      ? projectList.map((prj) => (
          <MobileNavLink
            closeFN={dialogCloseFN}
            linkText={
              <>
                <span
                  className="block w-3.5 h-3.5 rounded-full border-gray-300 border"
                  style={{ backgroundColor: prj.projectColorCode }}
                ></span>
                <span>{prj.projectName}</span>
              </>
            }
            path={myRoutes.viewProject.path(prj.projectId)}
            key={prj.projectId}
          />
        ))
      : "";
  }, [isFetchingProjectList, projectList]);

  return (
    <MobileSideNavContainer
      ref={dialogRef}
      closeFN={dialogCloseFN}
      showModal={() => dialogRef.current?.showModal()}
    >
      {/* Links */}
      <MobileNavLink
        path={myRoutes.appHome.path}
        linkText="Today"
        closeFN={dialogCloseFN}
      />
      <MobileNavLink
        path={myRoutes.archives.path}
        linkText="Archives"
        closeFN={dialogCloseFN}
      />
      {/* Project-Links */}
      <div className="flex flex-col gap-y-2.5 mt-3.5">
        <div className="text-dimForeground text-lg font-semibold uppercase px-3">
          Projects:
        </div>
        <MobileNavLink
          path={myRoutes.addProject.path}
          closeFN={dialogCloseFN}
          linkText={
            <>
              <AddIcon />
              <span>Add</span>
            </>
          }
        />
        {RenderProjectList}
      </div>
    </MobileSideNavContainer>
  );
}
