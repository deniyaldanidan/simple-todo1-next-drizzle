"use server";

import db from "@/db/db";
import { projects } from "@/db/schema";
import myRoutes from "@/utils/myRoutes";
import verifyAccess from "@/utils/verifyAccess";
import { intParser } from "@/utils/zod-valids";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
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

export default async function archiveProject(
  token: string,
  projectId: number
): Promise<returnType> {
  try {
    // * verifying auth
    const auth = verifyAccess(token);
    if (!auth.success) {
      return redirect(myRoutes.signIn.path);
    }
    const parsedProjectId = intParser.parse(projectId);
    // * archive the project
    await db
      .update(projects)
      .set({
        archived: true,
        archivedAt: new Date(),
      })
      .where(
        and(
          eq(projects.id, parsedProjectId),
          eq(projects.userId, auth.userId),
          eq(projects.archived, false)
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
