"use client";

import editProject from "@/actions/projects/editProject";
import ProjectForm from "@/components/Projects/ProjectForm";
import LoadingInfo from "@/components/utils/LoadingInfo";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import queryKeys from "@/utils/query-keys";
import getProjectBasic from "@/utils/queryfns/getProjectBasic";
import { createProjectParser } from "@/utils/zod-valids";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

type props = {
  params: {
    projectId: string;
  };
};

type mutateVarsType = {
  token: string;
  data: z.infer<typeof createProjectParser>;
};

export default function EditPage({ params: { projectId } }: props) {
  const { authObj } = useAuthContext();
  const {
    data,
    isSuccess,
    error: fetchErr,
    isFetching: isQueryFetching,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: queryKeys.editView(projectId),
    queryFn: () =>
      getProjectBasic({
        token: authObj.auth === true ? authObj.accessToken : "",
        projectId,
      }),
    enabled: authObj.auth === true,
  });

  const { mutateAsync: mutateFN, isPending: isMutating } = useMutation({
    mutationFn: (vars: mutateVarsType) =>
      editProject(vars.token, { ...vars.data, projectId: parseInt(projectId) }),
  });

  useEffect(() => {
    if (fetchErr && !isQueryFetching) {
      if (fetchErr instanceof AxiosError && fetchErr.response?.status === 404) {
        notFound();
      }
      throw new Error("Error happened");
    }
  }, [fetchErr, isQueryFetching]);

  if (isQueryLoading) {
    return <LoadingInfo />;
  }

  return isSuccess ? (
    <ProjectForm
      type="EDIT"
      isMutating={isMutating}
      mutateFN={mutateFN}
      initialData={{
        name: data.project.name,
        description: data.project.desc ?? "",
        colorCode: data.project.colorCode,
        note: data.project.note ?? "",
      }}
    />
  ) : (
    ""
  );
}
