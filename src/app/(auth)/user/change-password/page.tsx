"use client";

import changePassword from "@/actions/user/changePassword";
import InputGRP from "@/components/InputGRP/InputGRP";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import useSignOut from "@/hooks/useSignOut";
import { passwordParser } from "@/utils/zod-valids";
import React, { useState } from "react";
import { ZodError } from "zod";

export default function ChangePWDPage() {
  const { authObj } = useAuthContext();
  const signOutFN = useSignOut();

  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [rootErr, setRootErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string | string[]>("");
  const [confirmErr, setConfirmErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (authObj.auth !== true) {
      return;
    }
    setIsLoading(true);
    setRootErr("");
    setPasswordErr("");
    setConfirmErr("");

    try {
      if (password !== confirm) {
        return setConfirmErr("Passwords doesn't match");
      }
      const parsedPassword = passwordParser.parse(password);
      const result = await changePassword(authObj.accessToken, parsedPassword);
      if (result.success === false) {
        return setRootErr(result.error);
      }
      //   * sign-out the user before exiting
      await signOutFN();
    } catch (error) {
      if (error instanceof ZodError) {
        return setPasswordErr(error.flatten().formErrors);
      }
      console.log(error);
      setRootErr("error happened");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-fit min-h-screen px-page-margin-x py-12">
      <form
        className="flex flex-col gap-y-8 max-w-screen-sm mx-auto"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-y-1 items-center">
          <h2 className="text-section-title-font text-secForeground font-semibold text-center capitalize">
            Change Password
          </h2>
          <p className="text-danger text-base font-semibold">{rootErr}</p>
        </div>
        {/* New Password inp-grp */}
        <InputGRP
          inputId="change-password-new-password-input"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMsg={passwordErr}
          placeholder="Enter new password here"
          type="password"
        />
        {/* Confirm inp-grp */}
        <InputGRP
          inputId="change-password-confirm-input"
          label="Confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          errorMsg={confirmErr}
          placeholder="Retype the new password here"
          type="password"
        />

        <button
          type="submit"
          className="btn btn-xl btn-primary self-center"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
