"use server";

import db from "@/db/db";
import { projects } from "@/db/schema";
import verifyAccess from "@/utils/verifyAccess";
import { editProjectRouteParser } from "@/utils/zod-valids";
import { and, eq } from "drizzle-orm";
import { z, ZodError } from "zod";

type returnType =
  | {
      success: true;
      projectId: number;
    }
  | {
      success: false;
      error: string;
    };

export default async function editProject(
  token: string,
  data: z.infer<typeof editProjectRouteParser>
): Promise<returnType> {
  try {
    // * verifying auth
    const auth = verifyAccess(token);
    if (!auth.success) {
      return { success: false, error: "Authentication failed" };
    }
    const parsedData = editProjectRouteParser.parse(data);
    // * update the project
    await db
      .update(projects)
      .set({
        name: parsedData.name,
        description: parsedData.description,
        note: parsedData.note,
        colorCode: parsedData.colorCode,
      })
      .where(
        and(
          eq(projects.id, parsedData.projectId),
          eq(projects.userId, auth.userId),
          eq(projects.archived, false)
        )
      );
    return {
      success: true,
      projectId: parsedData.projectId,
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
