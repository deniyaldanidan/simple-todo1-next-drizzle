"use client";

import React, { forwardRef } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { MdOutlineClose as CloseIcon } from "react-icons/md";

const MobileSideNavContainer = forwardRef<
  HTMLDialogElement,
  { showModal: Function; closeFN: Function; children: React.ReactNode }
>((props, ref) => {
  return (
    <>
      <button
        className="fixed bottom-11 right-11 z-20 block bg-secondary p-1.5 text-4xl rounded-xl duration-200 active:scale-90"
        onClick={() => props.showModal()}
      >
        <CgMenuGridO />
      </button>
      <dialog
        ref={ref}
        className="my-dialog w-screen h-screen rounded-md bg-terBackground"
      >
        <div className="w-full h-full overflow-y-scroll bg-terBackground text-foreground flex flex-col gap-y-3.5 px-2 py-3 rounded-md">
          {/* Close button */}
          <button
            type="button"
            onClick={() => props.closeFN()}
            className="w-fit h-fit self-end mr-2 mb-3 px-3 py-1 text-lg flex items-center gap-x-1 bg-secondary rounded-md"
          >
            <CloseIcon />
            <span>Close</span>
          </button>
          {props.children}
        </div>
      </dialog>
    </>
  );
});

MobileSideNavContainer.displayName = "MobileSideNavContainer";

export default MobileSideNavContainer;
