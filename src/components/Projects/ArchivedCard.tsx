"use client";
import activateProject from "@/actions/projects/activateProject";
import deleteProject from "@/actions/projects/deleteProject";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import { enhancedDateFNSFormat } from "@/utils/helpers";
import myRoutes from "@/utils/myRoutes";
import queryKeys from "@/utils/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type props = {
  archProjInfo: {
    projectId: number;
    projectName: string;
    projectColorCode: string;
    createdAt: string;
    archived: true;
    archivedAt: string;
  };
};

export default function ArchivedCard({ archProjInfo }: props) {
  const { authObj } = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  const onActivateClick = async () => {
    if (authObj.auth !== true) {
      return;
    }
    try {
      const result = await activateProject(
        authObj.accessToken,
        archProjInfo.projectId
      );
      if (!result.success) {
        console.log(result.error);
        return;
      }
      // * invalidating queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.projectList,
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.today, exact: true });
      queryClient.invalidateQueries({
        queryKey: queryKeys.archivesList,
        exact: true,
      });
      //   // * removing queries
      //   queryClient.removeQueries({
      //     queryKey: queryKeys.archivedProject(result.projectId),
      //     exact: true,
      //   });
      router.push(myRoutes.viewProject.path(result.projectId));
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteClick = async () => {
    if (authObj.auth !== true) {
      return;
    }
    try {
      const result = await deleteProject(
        authObj.accessToken,
        archProjInfo.projectId
      );
      if (!result.success) {
        console.log(result.error);
        return;
      }
      // * invalidating queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.projectList,
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.today, exact: true });
      queryClient.invalidateQueries({ queryKey: queryKeys.due });
      queryClient.invalidateQueries({
        queryKey: queryKeys.archivesList,
        exact: true,
      });
      //   // * removing queries
      //   queryClient.removeQueries({
      //     queryKey: queryKeys.archivedProject(result.projectId),
      //     exact: true,
      //   });
      //   router.push(myRoutes.viewProject.path(result.projectId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between min-w-64 w-full gap-x-7 max-w-xl p-5 rounded-lg bg-dimBackground tablet-sm:flex-col tablet-sm:gap-y-5">
      {/* left */}
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <span
            className="block w-3.5 h-3.5 rounded-full border-gray-300 border mobile-lg:w-3 mobile:h-3"
            style={{ backgroundColor: archProjInfo.projectColorCode }}
          ></span>
          <span className="capitalize text-xl mobile-lg:text-lg">
            {archProjInfo.projectName}
          </span>
        </div>
        <div className="flex gap-x-1.5 items-center font-semibold text-base text-secForeground mobile-sm:text-sm">
          <span>Created:</span>
          <span>
            {enhancedDateFNSFormat(archProjInfo.createdAt, "MMM do, yyyy")}
          </span>
        </div>
        <div className="flex gap-x-1.5 items-center font-semibold text-base text-secForeground mobile-sm:text-sm">
          <span>Archived:</span>
          <span>
            {enhancedDateFNSFormat(archProjInfo.archivedAt, "MMM do, yyyy")}
          </span>
        </div>
      </div>
      {/* right */}
      <div className="flex items-start gap-x-6">
        <button
          type="button"
          className="btn btn-xs btn-primary"
          onClick={onActivateClick}
        >
          Activate
        </button>
        <button
          type="button"
          className="btn btn-xs btn-danger"
          onClick={onDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
