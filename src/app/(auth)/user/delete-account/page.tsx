"use client";

import deleteAccount from "@/actions/user/deleteAccount";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import useSignOut from "@/hooks/useSignOut";
import { useRef, useState } from "react";

export default function DeleteAccPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { authObj } = useAuthContext();
  const signOutFN = useSignOut();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteMyAccount = async () => {
    if (authObj.auth !== true) {
      return;
    }
    setIsLoading(true);
    try {
      const result = await deleteAccount(authObj.accessToken);
      if (result.success === false) {
        console.log(result.error);
        return;
      }
      dialogRef.current?.close();
      signOutFN();
    } catch (error) {
      console.log("Error happened while deleting user's account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-screen-md px-page-margin-x py-12">
      <h2 className="text-section-title-font font-semibold text-danger">
        Delete My Account
      </h2>
      <p className="text-lg text-justify mt-2">
        <strong className="text-warn text-xl">Warning:</strong> Deleting your
        account is permanent. All your projects, tasks, and data will be
        permanently removed and cannot be recovered. Are you sure you want to
        proceed?
      </p>
      <button
        type="button"
        className="btn btn-base btn-danger mt-7"
        onClick={() => dialogRef.current?.showModal()}
      >
        Delete My Account
      </button>
      <dialog ref={dialogRef} className="my-dialog bg-background rounded-md">
        <div className="rounded-md">
          <h3 className="bg-dimBackground capitalize text-danger text-xl font-bold px-4 py-2">
            Confirm account deletion
          </h3>
          <div className="px-4 pt-2.5 pb-4 bg-terBackground">
            <p className="text-foreground text-lg">
              This action is permanent. All data will be erased.{" "}
              <strong className="text-warn uppercase">Are you sure?</strong>
            </p>
            <div className="flex justify-center items-center gap-x-5 mt-5">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="btn btn-sm btn-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={deleteMyAccount}
                disabled={isLoading}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}
