"use client";

import editInfo from "@/actions/user/editInfo";
import InputGRP from "@/components/InputGRP/InputGRP";
import LoadingInfo from "@/components/utils/LoadingInfo";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import myRoutes from "@/utils/myRoutes";
import queryKeys from "@/utils/query-keys";
import getUserInfo from "@/utils/queryfns/getUserInfo";
import {
  EditUserInfoPageInpsError,
  editUserInfoPageParser,
} from "@/utils/zod-valids";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";

export default function UserEditPage() {
  const { authObj, signInUser } = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    isSuccess: isQuerySuccess,
    isLoading: isQueryLoading,
    data: queryData,
    isError: isQueryError,
    error: queryError,
  } = useQuery({
    queryKey: queryKeys.userInfo,
    queryFn: () =>
      getUserInfo(authObj.auth === true ? authObj.accessToken : ""),
    enabled: authObj.auth === true,
  });

  const [firstnameInp, setFirstnameInp] = useState<string>("");
  const [lastnameInp, setLastnameInp] = useState<string>("");
  const [usernameInp, setUsernameInp] = useState<string>("");
  const [emailInp, setEmailInp] = useState<string>("");
  const [rootErr, setRootErr] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<EditUserInfoPageInpsError>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isQueryError) {
      throw new Error(queryError.message);
    }
  }, [isQueryError, queryError]);

  useEffect(() => {
    if (isQuerySuccess) {
      setFirstnameInp(queryData.firstname);
      setLastnameInp(queryData.lastname);
      setUsernameInp(queryData.username);
      setEmailInp(queryData.email);
    }
  }, [isQuerySuccess, queryData]);

  if (isQueryLoading) {
    return <LoadingInfo />;
  }

  const submitHandler: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setRootErr("");
    setFieldErrors({});
    setIsLoading(true);
    if (authObj.auth !== true) {
      setIsLoading(false);
      return;
    }

    try {
      const inpData: z.infer<typeof editUserInfoPageParser> = {
        firstname: firstnameInp,
        lastName: lastnameInp,
        userName: usernameInp,
        email: emailInp,
      };
      const parsedData = editUserInfoPageParser.parse(inpData);
      console.log(parsedData);
      const result = await editInfo(authObj.accessToken, parsedData);
      if (result.success === false) {
        return setRootErr(result.error);
      }
      signInUser(result.token);
      queryClient.invalidateQueries({
        queryKey: queryKeys.userInfo,
        exact: true,
      });
      router.push(myRoutes.userInfo.path);
    } catch (error) {
      if (error instanceof ZodError) {
        return setFieldErrors(error.flatten().fieldErrors);
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
        className="flex flex-col gap-y-8 max-w-screen-md mx-auto"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-y-1 items-center">
          <h2 className="text-section-title-font text-secForeground font-semibold text-center capitalize">
            Edit User Info
          </h2>
          <p className="text-danger text-base font-semibold">{rootErr}</p>
        </div>
        {/* Firstname inp-grp */}
        <InputGRP
          inputId="edit-user-info-firstname-input"
          label="Firstname"
          value={firstnameInp}
          onChange={(e) => setFirstnameInp(e.target.value)}
          errorMsg={fieldErrors?.firstname ?? ""}
          placeholder="Enter your firstname here"
          type="text"
        />
        {/* Lastname inp-grp */}
        <InputGRP
          inputId="edit-user-info-lastname-input"
          label="Lastname"
          value={lastnameInp}
          onChange={(e) => setLastnameInp(e.target.value)}
          errorMsg={fieldErrors?.lastName ?? ""}
          placeholder="Enter your lastname here"
          type="text"
        />
        {/* Username inp-grp */}
        <InputGRP
          inputId="edit-user-info-username-input"
          label="Username"
          value={usernameInp}
          onChange={(e) => setUsernameInp(e.target.value)}
          errorMsg={fieldErrors?.userName ?? ""}
          placeholder="Enter your username here"
          type="text"
        />
        {/* email inp-grp */}
        <InputGRP
          inputId="edit-user-info-email-input"
          label="Email"
          value={emailInp}
          onChange={(e) => setEmailInp(e.target.value)}
          errorMsg={fieldErrors?.email ?? ""}
          placeholder="Enter your email here"
          type="email"
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
