import db from "@/db/db";
import { projects, tasks } from "@/db/schema";
import verifyAccessRouter from "@/utils/verifyAccessRouter";
import { and, eq, isNotNull } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { toZonedTime } from "date-fns-tz";
import { validTimezoneParser } from "@/utils/zod-valids";
import { isBefore, isSameDay } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const reqVerification = verifyAccessRouter();
    if (!reqVerification.success) {
      return NextResponse.json({ error: "Failed auth" }, { status: 401 });
    }

    const result = await db
      .select({
        taskInfo: {
          id: tasks.id,
          name: tasks.name,
          note: tasks.note,
          done: tasks.done,
          createdAt: tasks.createdAt,
          due: tasks.due,
        },
        projectId: projects.id,
        projectName: projects.name,
        colorCode: projects.colorCode,
      })
      .from(projects)
      .where(
        and(
          eq(projects.userId, reqVerification.userId),
          eq(projects.archived, false),
          isNotNull(tasks.id),
          isNotNull(tasks.due),
          eq(tasks.done, false)
        )
      )
      .leftJoin(tasks, eq(tasks.projectId, projects.id))
      .orderBy(tasks.due);

    return NextResponse.json({ tasks: result }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    console.log(error);
    return NextResponse.json(
      { error: "Unknown error happened." },
      { status: 500 }
    );
  }
}

export const revalidate = false;
export const dynamic = "force-dynamic";
