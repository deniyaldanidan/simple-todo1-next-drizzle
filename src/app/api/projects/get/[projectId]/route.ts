import db from "@/db/db";
import { projects, tasks } from "@/db/schema";
import verifyAccessRouter from "@/utils/verifyAccessRouter";
import { intParser } from "@/utils/zod-valids";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type taskType = {
  id: number;
  name: string;
  note: string | null;
  done: boolean;
  createdAt: number;
  due: Date | null;
};

export async function GET(
  req: Request,
  { params: { projectId } }: { params: { projectId: string } }
) {
  try {
    const reqVerification = verifyAccessRouter();
    if (!reqVerification.success) {
      return NextResponse.json({ error: "Failed auth" }, { status: 401 });
    }
    const parsedProjId = intParser.parse(projectId);
    const projectInfo = await db
      .select({
        project: {
          id: projects.id,
          name: projects.name,
          desc: projects.description,
          note: projects.note,
          colorCode: projects.colorCode,
          createdAt: projects.createdAt,
        },
        task: {
          id: tasks.id,
          name: tasks.name,
          note: tasks.note,
          done: tasks.done,
          createdAt: tasks.createdAt,
          due: tasks.due,
        },
      })
      .from(projects)
      .where(
        and(
          eq(projects.id, parsedProjId),
          eq(projects.userId, reqVerification.userId),
          eq(projects.archived, false)
        )
      )
      .leftJoin(tasks, eq(tasks.projectId, projects.id));
    if (!projectInfo.length) {
      return NextResponse.json({ err: "Not found" }, { status: 404 });
    }

    const mappedTsks = projectInfo.map((prj) => prj.task);

    const parsedtasks: taskType[] = mappedTsks.filter((tsk) => tsk !== null);
    return NextResponse.json(
      { project: projectInfo[0].project, tasks: parsedtasks },
      { status: 200 }
    );
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
