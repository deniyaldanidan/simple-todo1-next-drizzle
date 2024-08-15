import db from "@/db/db";
import { projects } from "@/db/schema";
import verifyAccRtr from "@/utils/verifyAccessRouter";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // * Verify auth
    const reqVerification = verifyAccRtr();
    if (!reqVerification.success) {
      return NextResponse.json({ error: "Failed auth" }, { status: 401 });
    }
    // * fetch data from DB
    const archivedProjectsList = await db
      .select({
        projectId: projects.id,
        projectName: projects.name,
        projectColorCode: projects.colorCode,
        createdAt: projects.createdAt,
        archived: projects.archived,
        archivedAt: projects.archivedAt,
      })
      .from(projects)
      .where(
        and(
          eq(projects.userId, reqVerification.userId),
          eq(projects.archived, true)
        )
      );
    return NextResponse.json(archivedProjectsList);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal error happened" },
      { status: 500 }
    );
  }
}

export const revalidate = false;
