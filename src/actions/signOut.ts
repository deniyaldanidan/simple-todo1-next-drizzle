"use server";

import { refershPayloadParser } from "@/utils/zod-valids";
import { cookies } from "next/headers";
import validator from "validator";
import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import secrets from "@/utils/secrets";
import db from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function signOut() {
  try {
    const refreshToken = cookies().get("refresh")?.value;
    if (typeof refreshToken === "undefined") {
      return { success: true };
    }
    cookies().set({
      name: "refresh",
      value: "",
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: "strict",
    });
    if (!validator.isJWT(refreshToken)) {
      return { success: true };
    }

    const parsedPayload = refershPayloadParser.safeParse(
      jwt.verify(refreshToken, secrets.REFRESH_SECRET)
    );
    if (!parsedPayload.success) {
      return { success: true };
    }

    const {
      data: { username: target_username },
    } = parsedPayload;

    // * now using the username aka target_username remove the refresh-token from the db
    await db
      .update(users)
      .set({ refreshToken: "" })
      .where(eq(users.userName, target_username));

    return { success: true };
  } catch (error) {
    if (
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError ||
      error instanceof NotBeforeError
    ) {
      return { success: true };
    }
    throw new Error("Internal error happened");
  }
}
