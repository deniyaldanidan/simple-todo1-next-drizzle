import db from "@/db/db";
import { projects } from "@/db/schema";
import verifyAccessRouter from "@/utils/verifyAccessRouter";
import { intParser } from "@/utils/zod-valids";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

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
        id: projects.id,
        name: projects.name,
        desc: projects.description,
        note: projects.note,
        colorCode: projects.colorCode,
      })
      .from(projects)
      .where(
        and(
          eq(projects.id, parsedProjId),
          eq(projects.userId, reqVerification.userId),
          eq(projects.archived, false)
        )
      );
    if (!projectInfo.length) {
      return NextResponse.json({ err: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ project: projectInfo[0] }, { status: 200 });
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
