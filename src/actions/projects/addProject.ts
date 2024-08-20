"use server";

import db from "@/db/db";
import { projects } from "@/db/schema";
import verifyAccess from "@/utils/verifyAccess";
import {
  createProjectParser,
  createProjectRouteParser,
} from "@/utils/zod-valids";
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

export default async function addProject(
  token: string,
  data: z.infer<typeof createProjectParser>
): Promise<returnType> {
  try {
    // * verifying auth
    const auth = verifyAccess(token);
    if (!auth.success) {
      return { success: false, error: "Authentication failed" };
    }
    const parsedData = createProjectRouteParser.parse(data);
    // * save it to db
    const ids = await db
      .insert(projects)
      .values({ ...parsedData, userId: auth.userId })
      .$returningId();
    return {
      success: true,
      projectId: ids[0].id,
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
