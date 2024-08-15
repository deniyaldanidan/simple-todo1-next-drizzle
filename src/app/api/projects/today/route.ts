import db from "@/db/db";
import { projects, tasks } from "@/db/schema";
import verifyAccessRouter from "@/utils/verifyAccessRouter";
import { isPast, isToday } from "date-fns";
import { and, eq, isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: Request) {
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
          isNotNull(tasks.due)
        )
      )
      .leftJoin(tasks, eq(tasks.projectId, projects.id));

    const filteredTasks = result.filter((tsk) => {
      const myDue = new Date(tsk.taskInfo?.due ?? "");
      if (isToday(myDue)) {
        return true;
      }
      if (isPast(myDue) && !tsk.taskInfo?.done) {
        return true;
      }
      return false;
    });

    return NextResponse.json({ tasks: filteredTasks }, { status: 200 });
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
