"use client";

import { z } from "zod";
import addProject from "@/actions/projects/addProject";
import { useMutation } from "@tanstack/react-query";
import ProjectForm from "@/components/Projects/ProjectForm";
import { createProjectParser } from "@/utils/zod-valids";

type mutateVarsType = {
  token: string;
  data: z.infer<typeof createProjectParser>;
};

export default function AddFormPage() {
  const { mutateAsync: mutateFN, isPending: isMutating } = useMutation({
    mutationFn: (vars: mutateVarsType) => addProject(vars.token, vars.data),
  });

  return <ProjectForm mutateFN={mutateFN} isMutating={isMutating} type="ADD" />;
}
