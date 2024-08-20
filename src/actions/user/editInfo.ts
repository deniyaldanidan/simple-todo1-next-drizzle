"use server";

import db from "@/db/db";
import { users } from "@/db/schema";
import { signAccessToken, signRefreshToken } from "@/utils/sign-jwts";
import verifyAccess from "@/utils/verifyAccess";
import { editUserInfoPageParser } from "@/utils/zod-valids";
import { and, eq, ne, or } from "drizzle-orm";
import { cookies } from "next/headers";
import { z, ZodError } from "zod";

type actionReturnType =
  | {
      success: true;
      token: string;
    }
  | {
      success: false;
      error: string;
    };

export default async function editInfo(
  token: string,
  data: z.infer<typeof editUserInfoPageParser>
): Promise<actionReturnType> {
  try {
    const authInfo = verifyAccess(token);
    if (authInfo.success === false) {
      return { success: false, error: "Authentication Failed" };
    }
    const parsedData = editUserInfoPageParser.parse(data);
    // * check if user already exists
    const foundUsers = await db
      .select()
      .from(users)
      .where(
        or(
          and(eq(users.email, parsedData.email), ne(users.id, authInfo.userId)),
          and(
            eq(users.userName, parsedData.userName),
            ne(users.id, authInfo.userId)
          )
        )
      );
    if (foundUsers.length) {
      return { success: false, error: "User credentials are already taken" };
    }
    // * create new refresh
    const { expiresIn, token: refresh } = signRefreshToken({
      username: parsedData.userName,
    });
    // * update user data
    await db
      .update(users)
      .set({
        firstname: parsedData.firstname,
        lastName: parsedData.lastName,
        userName: parsedData.userName,
        email: parsedData.email,
        refreshToken: refresh,
      })
      .where(eq(users.id, authInfo.userId));

    // * create new access-token
    const accessToken = signAccessToken({
      userId: authInfo.userId,
      username: parsedData.userName,
      firstname: parsedData.firstname,
      lastname: parsedData.lastName,
    });
    // * send refresh as cookie and access in response
    cookies().set({
      name: "refresh",
      value: refresh,
      httpOnly: true,
      secure: true,
      maxAge: expiresIn,
      sameSite: "strict",
    });
    return { success: true, token: accessToken };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error: "Validation failed" };
    }
    console.log(error);
    return { success: false, error: "Error happened" };
  }
}
