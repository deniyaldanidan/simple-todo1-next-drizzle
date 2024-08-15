"use server";

import db from "@/db/db";
import { projects, tasks } from "@/db/schema";
import verifyAccess from "@/utils/verifyAccess";
import { and, eq } from "drizzle-orm";

type data = {
  taskId: number;
  projectId: number;
  done: boolean;
};

type fnReturnType =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export default async function mutateTaskDone(
  token: string,
  data: data
): Promise<fnReturnType> {
  try {
    const auth = verifyAccess(token);
    if (!auth.success) {
      return { success: false, error: "Authentication is failed" };
    }
    // * check if the current user has that project
    const foundPrjs = await db
      .select()
      .from(projects)
      .where(
        and(eq(projects.id, data.projectId), eq(projects.userId, auth.userId))
      );
    if (!foundPrjs.length) {
      return { success: false, error: "Project is missing" };
    }
    // * update the task-done
    await db
      .update(tasks)
      .set({ done: data.done })
      .where(
        and(eq(tasks.id, data.taskId), eq(tasks.projectId, data.projectId))
      );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error happened" };
  }
}
