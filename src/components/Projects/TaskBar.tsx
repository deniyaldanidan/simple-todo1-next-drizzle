"use client";
import { PiNoteLight as NoteIcon } from "react-icons/pi";
import { IoTrashBinOutline as DeleteIcon } from "react-icons/io5";
import { PiTimer as DueIcon } from "react-icons/pi";
import { IoCalendarOutline as CreatedIcon } from "react-icons/io5";
import { MdCheckBoxOutlineBlank as CheckBlankIcon } from "react-icons/md";
import { MdOutlineCheckBox as CheckFillIcon } from "react-icons/md";
import { isPast } from "date-fns";
import { enhancedDateFNSFormat } from "@/utils/helpers";
import { clsx } from "clsx";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import mutateTaskDone from "@/actions/projects/mutateTaskDone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/utils/query-keys";
import deleteTask from "@/actions/projects/deleteTask";
import TaskAddEditBTN from "@/components/Projects/TaskAddEditBTN";
import ViewNoteComp from "@/components/Projects/ViewNoteComp";
import editTaskNote from "@/actions/projects/editTaskNote";

type props = {
  taskInfo: {
    id: number;
    name: string;
    note: string | null;
    done: boolean;
    createdAt: number;
    due: string | null;
  };
  projectId: number;
  projectName: string;
  colorCode?: string;
};

export default function TaskBar({
  taskInfo,
  projectId,
  projectName,
  colorCode,
}: props) {
  const { authObj } = useAuthContext();
  const queryClient = useQueryClient();

  const taskCreatedAt = enhancedDateFNSFormat(
    taskInfo.createdAt,
    "MMM d, yyyy hh:mm aaa"
  );
  const taskDueAt = enhancedDateFNSFormat(
    taskInfo.due ?? "",
    "MMM d, yyyy hh:mm aaa",
    "None"
  );

  const {
    mutate,
    isPending: isMutatePending,
    isError: isMutateErr,
    isSuccess: isMutateSuccess,
    data: mutateData,
  } = useMutation({
    mutationFn: (data: { projectId: number; note: string; token: string }) => {
      return editTaskNote(
        { taskId: taskInfo.id, projectId: data.projectId, note: data.note },
        data.token
      );
    },
  });

  const taskDoneBTNHandler = async () => {
    if (authObj.auth !== true) {
      return;
    }
    try {
      const result = await mutateTaskDone(authObj.accessToken, {
        taskId: taskInfo.id,
        done: !taskInfo.done,
        projectId,
      });
      if (!result.success) {
        return console.log(result.error);
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.projectView(projectId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.today,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const taskDeleteHandler = async () => {
    if (authObj.auth !== true) {
      return;
    }
    try {
      const result = await deleteTask(authObj.accessToken, {
        taskId: taskInfo.id,
        projectId,
      });
      if (!result.success) {
        return console.log(result.error);
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.projectView(projectId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.today,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-start justify-between px-5 py-3.5 rounded-lg",
        taskInfo.done ? "bg-dimBackground" : "bg-terBackground"
      )}
    >
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-semibold flex gap-x-1.5 items-center">
          <button
            type="button"
            className="text-success duration-150 hover:scale-110 hover:drop-shadow-[0px_0px_1.5px_#69FF85]"
            title="Mark task as done"
            onClick={taskDoneBTNHandler}
          >
            {taskInfo.done ? <CheckFillIcon /> : <CheckBlankIcon />}
          </button>
          <span className={taskInfo.done ? "line-through" : ""}>
            {taskInfo.name}
          </span>
          {typeof colorCode === "string" ? (
            <span
              className="block w-3.5 h-3.5 rounded-full border-gray-300 border"
              style={{ backgroundColor: colorCode }}
              title={projectName.toUpperCase()}
            ></span>
          ) : (
            ""
          )}
        </p>
        <div className="flex gap-x-5 items-center">
          <p
            className="max-w-[20.5ch] flex items-center gap-x-1.5 text-secForeground"
            title={`Task created at ${taskCreatedAt}`}
          >
            <CreatedIcon /> <span>{taskCreatedAt}</span>
          </p>
          <p
            className={clsx(
              "flex items-center gap-x-1.5",
              taskInfo.due?.length &&
                isPast(new Date(taskInfo.due)) &&
                !taskInfo.done
                ? "text-danger"
                : "text-secForeground"
            )}
            title={`task due at ${taskDueAt}`}
          >
            <DueIcon /> <span>{taskDueAt}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-x-5 text-xl">
        {!taskInfo.done ? (
          <>
            <ViewNoteComp
              btnLabel={<NoteIcon />}
              className="text-blue-200 duration-150 hover:text-accent"
              note={taskInfo.note ?? ""}
              projectName={projectName}
              isPending={isMutatePending}
              isError={isMutateErr}
              isSuccess={isMutateSuccess}
              data={mutateData}
              mutateFN={mutate}
              type="TASK"
              projectId={projectId}
              taskName={taskInfo.name}
            />
            <TaskAddEditBTN
              projectId={projectId}
              projectName={projectName}
              windowLabel="Edit Task"
              btnLabel=""
              btnClasses="text-warn duration-150 hover:text-accent"
              edit={true}
              taskId={taskInfo.id}
              taskName={taskInfo.name}
              taskDue={taskInfo.due}
            />
          </>
        ) : (
          ""
        )}
        <button
          type="button"
          className="text-danger duration-150 hover:text-accent"
          title="delete task"
          onClick={taskDeleteHandler}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
