"use client";

import React, { useState } from "react";
import InputGRP from "../InputGRP/InputGRP";
import { format } from "date-fns";
import { taskInpsError, taskInpsParser } from "@/utils/zod-valids";
import addTask from "@/actions/projects/addTask";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/utils/query-keys";
import editTask from "@/actions/projects/editTask";

type props = {
  projectId: number;
  closeDialog: () => void;
} & (
  | { edit: false }
  | { edit: true; taskId: number; taskName: string; taskDue: string | null }
);

export default function TaskForm(props: props) {
  const queryClient = useQueryClient();
  const { authObj } = useAuthContext();
  const [name, setName] = useState<string>(props.edit ? props.taskName : "");
  const [due, setDue] = useState<string>(
    props.edit && props.taskDue?.length ? props.taskDue : ""
  );
  const [rootErr, setRootErr] = useState<string>("");
  const [fieldErrs, setFieldErrs] = useState<taskInpsError>({});

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      name: string;
      due: string | undefined;
      accessToken: string;
    }) => {
      if (props.edit) {
        return editTask(
          {
            name: data.name,
            due: data.due,
            projectId: props.projectId,
            taskId: props.taskId,
          },
          data.accessToken
        );
      } else {
        return addTask(
          { name: data.name, due: data.due, projectId: props.projectId },
          data.accessToken
        );
      }
    },
    onSuccess: (data) => {
      if (!data.success) {
        return setRootErr(data.error);
      }
      if (!props.edit) {
        setName("");
        setDue("");
      }
      queryClient.invalidateQueries({
        queryKey: queryKeys.projectView(props.projectId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.today,
      });
      props.closeDialog();
    },
    onError: () => {
      setRootErr("Error happened");
    },
  });

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setFieldErrs({});
    setRootErr("");
    if (authObj.auth !== true) {
      return;
    }
    const parser = taskInpsParser.safeParse({
      name,
      due,
    });
    if (!parser.success) {
      return setFieldErrs(parser.error.flatten().fieldErrors);
    }
    const parsedData = parser.data;
    mutate({
      name: parsedData.name,
      due: parsedData.due,
      accessToken: authObj.accessToken,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="text-foreground flex flex-col gap-y-7 mt-5"
    >
      <p className="-mb-5 -mt-2.5 text-base text-center text-danger font-semibold">
        {rootErr}
      </p>
      <InputGRP
        type="text"
        label="Task Name"
        inputId="add-task-name-inp"
        placeholder="Enter task name here"
        value={name}
        onChange={(e) => setName(e.target.value)}
        errorMsg={fieldErrs?.name ?? ""}
      />
      <InputGRP
        type="datetime-local"
        label="Due"
        inputId="add-task-due-inp"
        placeholder=""
        value={due}
        onChange={(e) => setDue(e.target.value)}
        min={format(new Date(), "yyyy-MM-dd") + "T" + "00:00"}
        errorMsg={fieldErrs?.due ?? ""}
      />

      <button
        type="submit"
        className="btn btn-primary btn-full mt-5"
        disabled={isPending}
      >
        {isPending ? "..." : props.edit ? "Edit" : "Add"}
      </button>
    </form>
  );
}

/* 
! Things essential for creating a tasks
- inputs: name, due
- ids: projectId
- due will goes out in ISOstring `new Date(due).toISOString()`
*/
