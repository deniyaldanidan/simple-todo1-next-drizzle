"use client";

import TaskBar from "@/components/Projects/TaskBar";
import LoadingInfo from "@/components/utils/LoadingInfo";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import queryKeys from "@/utils/query-keys";
import getDue from "@/utils/queryfns/getDue";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function Page() {
  const { authObj } = useAuthContext();
  const { isSuccess, data, isLoading } = useQuery({
    queryKey: queryKeys.due,
    queryFn: () => getDue(authObj.auth === true ? authObj.accessToken : ""),
    enabled: authObj.auth === true,
  });

  // Calculate Completed & Uncompleted tasks here & render it using the TaskBar - Component
  const { completedTasks, unCompletedTasks } = useMemo(() => {
    if (!isSuccess) {
      return { completedTasks: [], unCompletedTasks: [] };
    }
    const completedTasks = data.tasks.filter((tsk) => tsk.taskInfo.done);
    const unCompletedTasks = data.tasks.filter((tsk) => !tsk.taskInfo.done);
    return { completedTasks, unCompletedTasks };
  }, [data, isSuccess]);

  if (isLoading) {
    return <LoadingInfo />;
  }

  return (
    <div className="min-h-screen h-fit px-page-margin-x py-12">
      <section className="pb-5 mb-7 border-b-2 border-b-terBackground">
        <h2 className="text-secForeground text-section-title-font">
          Planned Tasks
        </h2>
        <h3 className="text-dimForeground text-section-subtitle-font mt-4">
          View all scheduled tasks
        </h3>
      </section>
      <section className="max-w-[1150px] mx-auto">
        <h3 className="text-xl text-secForeground font-semibold mb-4 mobile:text-lg">
          Tasks
        </h3>
        {unCompletedTasks.length ? (
          <div className="flex flex-col gap-y-5">
            {unCompletedTasks.map((tsk) => (
              <TaskBar
                key={tsk.taskInfo.id}
                taskInfo={tsk.taskInfo}
                projectId={tsk.projectId}
                projectName={tsk.projectName}
                colorCode={tsk.colorCode}
              />
            ))}
          </div>
        ) : (
          <div>No tasks here yet</div>
        )}
      </section>
      {!completedTasks.length ? (
        ""
      ) : (
        <section className="max-w-[1150px] mx-auto">
          <details>
            <summary className="mt-10 text-xl text-dimForeground font-semibold mobile:text-lg">
              Completed tasks &#40;{completedTasks.length}&#41;
            </summary>
            <div className="flex flex-col gap-y-5 mt-4 pl-3">
              {completedTasks.map((tsk) => (
                <TaskBar
                  key={tsk.taskInfo.id}
                  taskInfo={tsk.taskInfo}
                  projectId={tsk.projectId}
                  projectName={tsk.projectName}
                  colorCode={tsk.colorCode}
                />
              ))}
            </div>
          </details>
        </section>
      )}
    </div>
  );
}
