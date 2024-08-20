"use server";

import db from "@/db/db";
import { projects } from "@/db/schema";
import verifyAccess from "@/utils/verifyAccess";
import { intParser } from "@/utils/zod-valids";
import { and, eq } from "drizzle-orm";
import { ZodError } from "zod";

type returnType =
  | {
      success: true;
      projectId: number;
    }
  | {
      success: false;
      error: string;
    };

export default async function deleteProject(
  token: string,
  projectId: number
): Promise<returnType> {
  try {
    // * verifying auth
    const auth = verifyAccess(token);
    if (!auth.success) {
      return { success: false, error: "Authentication failed" };
    }
    const parsedProjectId = intParser.parse(projectId);
    // * delete the project
    await db
      .delete(projects)
      .where(
        and(
          eq(projects.id, parsedProjectId),
          eq(projects.userId, auth.userId),
          eq(projects.archived, true)
        )
      );
    return {
      success: true,
      projectId: parsedProjectId,
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
