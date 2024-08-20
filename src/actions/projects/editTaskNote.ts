"use server";

import db from "@/db/db";
import { projects, tasks } from "@/db/schema";
import verifyAccess from "@/utils/verifyAccess";
import { editTaskNoteParser } from "@/utils/zod-valids";
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

type data = z.infer<typeof editTaskNoteParser>;

export default async function editTaskNote(
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
    const parsedData = editTaskNoteParser.parse(data);
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
    // * update the note-data
    await db
      .update(tasks)
      .set({
        note: parsedData.note,
      })
      .where(eq(tasks.id, parsedData.taskId));

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error: "Validation error" };
    }
    return { success: false, error: "error happened" };
  }
}
