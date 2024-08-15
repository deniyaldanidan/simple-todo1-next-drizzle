"use client";

import { GrClose as CloseIcon } from "react-icons/gr";
import InputGRP from "@/components/InputGRP/InputGRP";
import ColorCodeInp from "@/components/utils/ColorCodeInp";
import { createProjectError, createProjectParser } from "@/utils/zod-valids";
import { ReactEventHandler, useState } from "react";
import { IColor } from "react-color-palette";
import { z, ZodError } from "zod";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import { useRouter } from "next/navigation";
import myRoutes from "@/utils/myRoutes";
import { UseMutateAsyncFunction, useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/utils/query-keys";

type mutateReturnType =
  | {
      success: true;
      projectId: number;
    }
  | {
      success: false;
      error: string;
    };

type dataType = z.infer<typeof createProjectParser>;

type formType = { type: "ADD" } | { type: "EDIT"; initialData: dataType };

type props = {
  mutateFN: UseMutateAsyncFunction<
    mutateReturnType,
    Error,
    { token: string; data: dataType }
  >;
  isMutating: boolean;
} & formType;

export default function ProjectForm(props: props) {
  const { authObj } = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [projectName, setProjectName] = useState<string>(
    props.type === "EDIT" ? props.initialData.name : ""
  );
  const [projectDesc, setProjectDesc] = useState<string>(
    props.type === "EDIT" ? props.initialData.description : ""
  );
  const [projectNote, setProjectNote] = useState<string>(
    props.type === "EDIT" ? props.initialData.note : ""
  );
  const [projectColorCode, setProjectColorCode] = useState<string>(
    props.type === "EDIT" ? props.initialData.colorCode : "#afafaf"
  );
  const [colorInpShow, setColorInpShow] = useState<boolean>(false);
  const [rootErr, setRootErr] = useState<string>("");
  const [formErr, setFormErr] = useState<createProjectError>({});

  const onColorChangeInp = (color: IColor) => {
    // console.log(color.hex);
    setProjectColorCode(color.hex);
  };

  const submitHandler: ReactEventHandler = async (e) => {
    e.preventDefault();
    setFormErr({});
    setRootErr("");
    if (authObj.auth !== true) {
      return;
    }
    try {
      const parsedVals = await createProjectParser.parseAsync({
        name: projectName,
        description: projectDesc,
        note: projectNote,
        colorCode: projectColorCode,
      });
      const result = await props.mutateFN({
        token: authObj.accessToken,
        data: parsedVals,
      });
      if (!result.success) {
        return setRootErr(result.error);
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.projectList });
      if (props.type === "EDIT") {
        queryClient.invalidateQueries({ queryKey: queryKeys.today });
        queryClient.invalidateQueries({
          queryKey: queryKeys.projectView(result.projectId).slice(0, 2),
          exact: false,
        });
      }
      return router.push(myRoutes.viewProject.path(result.projectId));
    } catch (error) {
      if (error instanceof ZodError) {
        return setFormErr(error.flatten().fieldErrors);
      }

      setRootErr("Unknown error happened. Try again later");
    }
  };

  return (
    <form
      className="mx-auto py-10 px-page-margin-x max-w-screen-lg flex flex-col gap-y-10"
      onSubmit={submitHandler}
    >
      <div>
        <h2 className="text-section-title-font font-semibold text-center">
          {props.type === "EDIT" ? "Edit" : "New"} Project
        </h2>
        <p className="text-base text-danger text-center">{rootErr}</p>
      </div>
      <InputGRP
        inputId={`${props.type === "EDIT" ? "edit" : "add"}-project-name-input`}
        type="text"
        label="Project Name"
        placeholder="Name of your project"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        errorMsg={formErr.name ?? ""}
      />
      <InputGRP
        inputId={`${
          props.type === "EDIT" ? "edit" : "add"
        }-project-description-input`}
        textArea
        textAreaRows={4}
        label="Project Description"
        placeholder="Describe shortly about your project"
        value={projectDesc}
        onChange={(e) => setProjectDesc(e.target.value)}
        errorMsg={formErr.description ?? ""}
      />
      <InputGRP
        inputId={`${props.type === "EDIT" ? "edit" : "add"}-project-note-input`}
        textArea
        textAreaRows={6}
        label="Project Note (Optional)"
        placeholder="Extra details about your project"
        value={projectNote}
        onChange={(e) => setProjectNote(e.target.value)}
        errorMsg={formErr.note ?? ""}
      />
      <div className="flex flex-col gap-y-3.5 w-fit">
        {colorInpShow ? (
          <div className="self-end">
            <ColorCodeInp
              initialColor={projectColorCode}
              onChangeComplete={onColorChangeInp}
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-x-7 items-center w-fit">
          <div className="text-xl font-bold">Color Code</div>
          <div className="flex gap-x-5 items-center">
            <div
              style={{ backgroundColor: projectColorCode }}
              className="w-5 h-5 rounded-full border-gray-50 border-[2px]"
            ></div>
            <p className="text-lg uppercase font-medium">{projectColorCode}</p>
            <button
              type="button"
              onClick={() => setColorInpShow((prev) => !prev)}
              className="btn btn-base btn-secondary ml-2.5 flex gap-x-1.5 items-center"
            >
              {colorInpShow ? (
                <>
                  <CloseIcon /> <span>Close</span>
                </>
              ) : (
                <span>Change</span>
              )}
            </button>
          </div>
        </div>
        <p className="text-base text-danger -mt-2">{formErr.colorCode ?? ""}</p>
      </div>
      <button
        type="submit"
        className="btn btn-xl btn-primary self-center"
        disabled={props.isMutating}
      >
        {props.isMutating ? "..." : "Submit"}
      </button>
    </form>
  );
}
