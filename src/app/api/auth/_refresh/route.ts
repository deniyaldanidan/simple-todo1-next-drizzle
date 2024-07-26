import { cookies } from "next/headers";
import { MyHttpError } from "@/utils/CustErrors";
import validator from "validator";
import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import { refershPayloadParser } from "@/utils/zod-valids";
import db from "@/db/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { signAccessToken } from "@/utils/sign-jwts";
import { NextResponse } from "next/server";
import secrets from "@/utils/secrets";

export async function POST(req: Request) {
  try {
    // * Get the refresh and check if it is a valid one
    const refreshToken = cookies().get("refresh")?.value;
    if (typeof refreshToken === "undefined" || !validator.isJWT(refreshToken)) {
      throw new MyHttpError("Invalid token", 401);
    }
    // * verify our refresh-token & parse the payload from it
    const parsedRefreshPayload = refershPayloadParser.safeParse(
      jwt.verify(refreshToken, secrets.REFRESH_SECRET)
    );
    if (!parsedRefreshPayload.success) {
      throw new MyHttpError("Invalid token", 409);
    }
    const refreshPayload = parsedRefreshPayload.data;
    // * get the owner
    const foundUser = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.userName, refreshPayload.username),
          eq(users.refreshToken, refreshToken)
        )
      );
    if (!foundUser.length) {
      throw new MyHttpError("Invalid token", 401);
    }
    // * generate access-token and send it in the RESPONSE
    const accessToken = signAccessToken({
      username: foundUser[0].userName,
      userId: foundUser[0].id,
      firstname: foundUser[0].firstname,
      lastname: foundUser[0].lastName,
    });
    return NextResponse.json({ token: accessToken }, { status: 200 });
  } catch (error) {
    if (error instanceof MyHttpError) {
      error.logMSG.length && console.log(error.logMSG);
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    if (
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError ||
      error instanceof NotBeforeError
    ) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    console.log(error);
    return NextResponse.json(
      { error: "Internal error happened" },
      { status: 500 }
    );
  }
}
