import db from "@/db/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.select().from(users);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Some internal error happened." },
      { status: 500 }
    );
  }
}
