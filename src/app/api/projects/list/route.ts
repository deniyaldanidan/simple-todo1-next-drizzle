import db from "@/db/db";
import { projects } from "@/db/schema";
import verifyAccRtr from "@/utils/verifyAccessRouter";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const reqVerification = verifyAccRtr();
    if (!reqVerification.success) {
      return NextResponse.json({ error: "Failed auth" }, { status: 401 });
    }
    const projectsList = await db
      .select({
        projectId: projects.id,
        projectName: projects.name,
        projectColorCode: projects.colorCode,
      })
      .from(projects)
      .where(
        and(
          eq(projects.userId, reqVerification.userId),
          eq(projects.archived, false)
        )
      );
    return NextResponse.json(projectsList);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal error happened" },
      { status: 500 }
    );
  }
}

export const revalidate = false;
