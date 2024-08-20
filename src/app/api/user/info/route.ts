import db from "@/db/db";
import { users } from "@/db/schema";
import verifyAccessRouter from "@/utils/verifyAccessRouter";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // * verify auth
    const reqVerification = verifyAccessRouter();
    if (!reqVerification.success) {
      return NextResponse.json({ error: "Failed auth" }, { status: 401 });
    }
    // * get user-info for the auth user
    const result = await db
      .select({
        firstname: users.firstname,
        lastname: users.lastName,
        username: users.userName,
        email: users.email,
      })
      .from(users)
      .where(eq(users.userName, reqVerification.username));

    // * send 404 if user is not found
    if (!result.length) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }
    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Unknown error happened." },
      { status: 500 }
    );
  }
}

export const revalidate = false;
