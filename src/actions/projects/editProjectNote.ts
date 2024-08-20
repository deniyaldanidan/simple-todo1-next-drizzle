"use server";

import db from "@/db/db";
import { projects } from "@/db/schema";
import verifyAccess from "@/utils/verifyAccess";
import { editProjectNoteParser } from "@/utils/zod-valids";
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

export default async function editProjectNote(
  token: string,
  data: z.infer<typeof editProjectNoteParser>
): Promise<returnType> {
  try {
    // * verifying auth
    const auth = verifyAccess(token);
    if (!auth.success) {
      return { success: false, error: "Authentication failed" };
    }
    // * Validating the data
    const { note, projectId } = editProjectNoteParser.parse(data);
    // * update the project-note
    await db
      .update(projects)
      .set({ note })
      .where(and(eq(projects.id, projectId), eq(projects.userId, auth.userId)));
    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error: "Validation failed" };
    }

    console.log(error);

    return {
      success: false,
      error: "Unknown error happened. Try again later.",
    };
  }
}
