"use server";

import db from "@/db/db";
import { projects, tasks } from "@/db/schema";
import verifyAccess from "@/utils/verifyAccess";
import { addTaskParser } from "@/utils/zod-valids";
import { and, eq } from "drizzle-orm";
import { z, ZodError } from "zod";

type returnType =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

type data = z.infer<typeof addTaskParser>;

export default async function addTask(
  data: data,
  accessToken: string
): Promise<returnType> {
  try {
    // * verifying auth
    const auth = verifyAccess(accessToken);
    if (!auth.success) {
      return { success: false, error: "Authentication failed" };
    }

    // * validate the data
    const parsedData = addTaskParser.parse(data);
    // * does authenticated-user has the requested project
    const foundProject = await db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, parsedData.projectId),
          eq(projects.archived, false),
          eq(projects.userId, auth.userId)
        )
      );
    if (!foundProject.length) {
      return { success: false, error: "Project doesn't exist" };
    }

    await db.insert(tasks).values({
      name: parsedData.name,
      projectId: foundProject[0].id,
      due: parsedData.due ? new Date(parsedData.due) : undefined,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error: "Validation error" };
    }
    return { success: false, error: "error happened" };
  }
}
