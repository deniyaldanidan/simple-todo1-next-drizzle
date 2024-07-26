"use server";

import { cookies } from "next/headers";
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
import secrets from "@/utils/secrets";

type refreshReturn = Promise<
  | {
      success: true;
      token: string;
    }
  | {
      success: false;
      error: false;
    }
  | {
      success: false;
      error: true;
      errMsg: string;
    }
>;

export default async function refresh(): refreshReturn {
  try {
    // * Get the refresh and check if it is a valid one
    const refreshToken = cookies().get("refresh")?.value;
    if (typeof refreshToken === "undefined" || !validator.isJWT(refreshToken)) {
      return { success: false, error: false };
    }
    // * verify our refresh-token and parse the payload from the token
    const parsedRefreshPayload = refershPayloadParser.safeParse(
      jwt.verify(refreshToken, secrets.REFRESH_SECRET)
    );
    if (!parsedRefreshPayload.success) {
      return { success: false, error: false };
    }
    const { data: refreshPayload } = parsedRefreshPayload;
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
      return { success: false, error: false };
    }
    // * generate access-token and send it
    const accessToken = signAccessToken({
      username: foundUser[0].userName,
      userId: foundUser[0].id,
      firstname: foundUser[0].firstname,
      lastname: foundUser[0].lastName,
    });
    return { success: true, token: accessToken };
  } catch (error) {
    if (
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError ||
      error instanceof NotBeforeError
    ) {
      return { success: false, error: false };
    }
    console.error(error);
    return { success: false, error: true, errMsg: "Internal error happened" };
  }
}
