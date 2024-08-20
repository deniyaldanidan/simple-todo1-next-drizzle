"use client";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import myRoutes from "@/utils/myRoutes";
import queryKeys from "@/utils/query-keys";
import getProject from "@/utils/queryfns/getProject";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import TaskBar from "@/components/Projects/TaskBar";
import { enhancedDateFNSFormat } from "@/utils/helpers";
import ViewNoteComp from "@/components/Projects/ViewNoteComp";
import TaskAddEditBTN from "@/components/Projects/TaskAddEditBTN";
import { useEffect, useMemo } from "react";
import editProjectNote from "@/actions/projects/editProjectNote";
import { AxiosError } from "axios";
import LoadingInfo from "@/components/utils/LoadingInfo";
import archiveProject from "@/actions/projects/archiveProject";

type props = {
  params: {
    projectId: string;
  };
};

type mutateInpDataType = { note: string; projectId: number; token: string };

export default function Page({ params: { projectId } }: props) {
  const { authObj } = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data,
    isSuccess,
    error: fetchErr,
    isFetching: isQueryFetching,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: queryKeys.projectView(projectId),
    queryFn: () =>
      getProject({
        token: authObj.auth === true ? authObj.accessToken : "",
        projectId,
      }),
    enabled: authObj.auth === true,
  });

  const {
    mutate,
    isPending: isMutatePending,
    isError: isMutateErr,
    isSuccess: isMutateSuccess,
    data: mutateData,
  } = useMutation({
    mutationFn: (data: mutateInpDataType) => {
      return editProjectNote(data.token, {
        note: data.note,
        projectId: data.projectId,
      });
    },
  });

  const { completedTasks, unCompletedTasks } = useMemo(() => {
    if (!isSuccess || !data?.tasks.length) {
      return { completedTasks: [], unCompletedTasks: [] };
    }
    const completedTasks = data.tasks.filter((tsk) => tsk.done === true);
    const unCompletedTasks = data.tasks.filter((tsk) => tsk.done === false);
    return { completedTasks, unCompletedTasks };
  }, [isSuccess, data]);

  useEffect(() => {
    if (fetchErr && !isQueryFetching) {
      if (fetchErr instanceof AxiosError && fetchErr.response?.status === 404) {
        notFound();
      }
      throw new Error("Error happened");
    }
  }, [fetchErr, isQueryFetching]);

  if (isQueryLoading) {
    return <LoadingInfo />;
  }

  const archiveThisProject = async () => {
    if (authObj.auth !== true) {
      return;
    }
    try {
      const result = await archiveProject(
        authObj.accessToken,
        data?.project.id ?? parseInt(projectId)
      );
      if (!result.success) {
        return console.log(result.error);
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
      // * removeQueries
      queryClient.removeQueries({
        queryKey: queryKeys.projectView(result.projectId).slice(0, 2),
        exact: false,
      });
      // * navigate to archived-projects-list
      router.replace(myRoutes.archives.path);
    } catch (error) {
      console.log("Error happened");
    }
  };

  return !data?.project.name.length ? (
    <></>
  ) : (
    <div className="py-12 px-page-margin-x">
      <section className="flex flex-col gap-y-5 pb-5 mb-7 border-b-2 border-b-terBackground">
        <h2 className="flex gap-x-4 items-center">
          <span className="capitalize text-section-title-font font-semibold">
            {data.project.name}
          </span>
          <span
            style={{ backgroundColor: data.project.colorCode }}
            className="w-5 h-5 block rounded-full border-2 border-gray-300"
          ></span>
        </h2>
        <p className="text-section-subtitle-font font-medium text-secForeground">
          {data.project.desc}
        </p>
        <div className="flex gap-x-1.5 text-secForeground font-semibold">
          <span>Created:</span>
          <time dateTime={new Date(data.project.createdAt * 1000).toString()}>
            {enhancedDateFNSFormat(
              data.project.createdAt,
              "MMM d, yyyy hh:mm a"
            )}
          </time>
        </div>
        <div className="flex gap-x-6 items-baseline">
          <p className="uppercase text-dimForeground">ACTIONS:</p>
          <ViewNoteComp
            btnLabel="View Note"
            className="base-styled-link text-blue-300 underline underline-offset-2"
            note={data.project.note ?? ""}
            projectName={data.project.name}
            isPending={isMutatePending}
            isError={isMutateErr}
            isSuccess={isMutateSuccess}
            data={mutateData}
            mutateFN={mutate}
            type="PROJ"
            projectId={data.project.id}
          />
          <Link
            href={myRoutes.editProject.path(data.project.id)}
            className="base-styled-link text-warn underline underline-offset-2"
          >
            Edit Project
          </Link>
          <button
            type="button"
            className="base-styled-link text-danger underline underline-offset-2"
            onClick={archiveThisProject}
          >
            Archive Project
          </button>
        </div>
      </section>
      <section className="max-w-[1150px] mx-auto">
        {/* Tasks section head */}
        <div className="flex items-center gap-x-7 justify-between mb-5">
          <h3 className="text-2xl text-secForeground font-semibold">Tasks</h3>
          <TaskAddEditBTN
            projectId={data.project.id}
            projectName={data.project.name}
            windowLabel="Add Task"
            btnLabel="Add Task"
            btnClasses="btn btn-sm btn-primary btn-flex"
            edit={false}
          />
        </div>
        {/* Undone Tasks list */}
        {unCompletedTasks.length ? (
          <div className="flex flex-col gap-y-5">
            {unCompletedTasks.map((task) => (
              <TaskBar
                key={task.id}
                taskInfo={task}
                projectId={data.project.id}
                projectName={data.project.name}
              />
            ))}
          </div>
        ) : (
          <div>No tasks created yet!</div>
        )}
      </section>
      {!completedTasks.length ? (
        ""
      ) : (
        <section className="max-w-[1150px] mx-auto">
          <details>
            <summary className="mt-10 text-xl text-dimForeground font-semibold">
              Completed tasks &#40;{completedTasks.length}&#41;
            </summary>
            <div className="flex flex-col gap-y-5 mt-4 pl-3">
              {completedTasks.map((tsk) => (
                <TaskBar
                  key={tsk.id}
                  taskInfo={tsk}
                  projectId={data.project.id}
                  projectName={data.project.name}
                />
              ))}
            </div>
          </details>
        </section>
      )}
    </div>
  );
}
