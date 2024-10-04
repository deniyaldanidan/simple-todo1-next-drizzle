"use client";

import useAuthContext from "@/contexts/Auth/useAuthContext";
import queryKeys from "@/utils/query-keys";
import { noteInpParser } from "@/utils/zod-valids";
import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronRight as RightIcon } from "react-icons/fa6";

type returnType = { success: true } | { success: false; error: string };

type props = {
  btnLabel: string | React.ReactNode;
  className: string;
  note: string;
  projectName: string;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: returnType;
  projectId: number;
  mutateFN: UseMutateFunction<
    returnType,
    Error,
    { note: string; projectId: number; token: string }
  >;
} & (
  | {
      type: "PROJ";
    }
  | {
      type: "TASK";
      taskName: string;
    }
);

export default function ViewNoteComp(props: props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();
  const { authObj } = useAuthContext();
  const [editState, setEditState] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(props.note);
  const [rootErr, setRootErr] = useState<string>("");

  useEffect(() => {
    if (props.isPending) {
      setRootErr("");
    } else if (props.isError) {
      setRootErr("error happened");
    } else if (props.isSuccess) {
      if (props.data?.success === false) {
        setRootErr(props.data?.error ?? "error happened");
      } else {
        if (props.type === "PROJ") {
          queryClient.invalidateQueries({
            queryKey: queryKeys.editView(props.projectId),
          });
        }
        queryClient.invalidateQueries({
          queryKey: queryKeys.projectView(props.projectId),
        });

        queryClient.invalidateQueries({ queryKey: queryKeys.today });
        queryClient.invalidateQueries({ queryKey: queryKeys.due });
        dialogRef.current?.close();
      }
    }
  }, [
    props.isPending,
    props.isError,
    props.isSuccess,
    props.data,
    props.projectId,
    queryClient,
    props.type,
  ]);

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (authObj.auth !== true) {
      return;
    }
    const parser = noteInpParser.safeParse(editValue);
    if (!parser.success) {
      return setRootErr(parser.error.flatten().formErrors[0]);
    }
    props.mutateFN({
      note: parser.data,
      token: authObj.accessToken,
      projectId: props.projectId,
    });
  };

  return (
    <>
      <button
        type="button"
        className={props.className}
        onClick={() => dialogRef.current?.showModal()}
        title={`View ${props.type === "PROJ" ? "Project" : "Task"} note`}
      >
        {props.btnLabel}
      </button>
      <dialog
        ref={dialogRef}
        className="my-dialog bg-transparent mobile:w-full mobile-sm:mx-auto mobile-sm:min-w-[95vw]"
        onClose={() => setEditState(false)}
      >
        <section className="min-h-screen h-fit min-w-64 w-[90vw] max-w-[1024px] bg-dimBackground px-9 py-8 mobile:w-full mobile:mx-auto mobile:px-4 mobile:py-5 mobile-xs:px-3">
          <div className="flex justify-between items-center gap-x-5 pb-5 mb-7 border-b-2 border-b-terBackground mobile:flex-col mobile:gap-y-5">
            <div className="text-foreground text-lg font-semibold uppercase flex flex-wrap items-center gap-x-1.5 mobile:justify-center mobile:text-center mobile-sm:text-base">
              {props.type === "PROJ" ? (
                props.projectName
              ) : (
                <>
                  <span>{props.projectName}</span>
                  <span>
                    <RightIcon />
                  </span>
                  <span>Task Note</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-x-5">
              <button
                type="button"
                onClick={() => setEditState((prev) => !prev)}
                className="btn btn-secondary btn-sm mobile-md:btn-xs"
              >
                {editState ? "View" : "Edit"}
              </button>
              <button
                onClick={() => dialogRef.current?.close()}
                className="btn btn-primary btn-sm mobile-md:btn-xs"
              >
                Close
              </button>
            </div>
          </div>
          {editState ? (
            <form className="flex flex-col gap-y-5" onSubmit={onSubmit}>
              <p className="text-center text-danger text-base font-semibold -mb-2">
                {rootErr}
              </p>
              <textarea
                className="inp-base-classes"
                rows={15}
                placeholder="Type your note here"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="btn btn-xl btn-primary self-center"
                disabled={props.isPending}
              >
                {props.isPending ? "..." : "Submit"}
              </button>
            </form>
          ) : (
            <p className="text-lg text-foreground whitespace-pre-line leading-relaxed">
              {props.note.length ? props.note : "No notes to show"}
            </p>
          )}
        </section>
      </dialog>
    </>
  );
}
