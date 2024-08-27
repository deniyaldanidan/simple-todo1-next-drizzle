"use client";

import { useRef } from "react";
import { MdAdd as AddIcon } from "react-icons/md";
import { CiEdit as EditIcon } from "react-icons/ci";
import TaskForm from "./TaskForm";
import { FaChevronRight as RightIcon } from "react-icons/fa";

type props = {
  projectId: number;
  projectName: string;
  windowLabel: string;
  btnLabel: string;
  btnClasses: string;
} & (
  | { edit: false }
  | { edit: true; taskId: number; taskName: string; taskDue: string | null }
);

export default function TaskAddEditBTN(props: props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={props.btnClasses}
        title={props.windowLabel}
      >
        {props.edit ? <EditIcon /> : <AddIcon />}
        <span>{props.btnLabel}</span>
      </button>
      <dialog
        ref={dialogRef}
        className="my-dialog bg-transparent tablet-sm:w-full mobile-sm:mx-auto mobile-sm:min-w-[95vw]"
      >
        <section className="p-5 w-[95vw] max-w-[550px] h-fit bg-dimBackground tablet-sm:w-full tablet-sm:mx-auto mobile-sm:px-3">
          <div className="flex items-center justify-between gap-x-3 mobile-sm:flex-col-reverse mobile-sm:gap-y-3">
            <h3 className="text-base text-dimForeground font-semibold flex flex-wrap gap-y-2 gap-x-1.5 items-center">
              <span>{props.windowLabel}</span>
              <RightIcon />
              <span className="capitalize">{props.projectName}</span>
            </h3>
            <button
              className="btn btn-primary btn-sm tablet-sm:btn-xs mobile-sm:self-end"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
          </div>
          <TaskForm
            projectId={props.projectId}
            closeDialog={() => {
              dialogRef.current?.close();
            }}
            edit={props.edit === true ? (true as const) : (false as const)}
            taskId={props.edit ? props.taskId : 0}
            taskName={props.edit ? props.taskName : ""}
            taskDue={props.edit ? props.taskDue : null}
          />
        </section>
      </dialog>
    </>
  );
}
