import db from "@/db/db";
import { users } from "@/db/schema";
import { ConflictError } from "@/utils/CustErrors";
import { SignInRouteInputsParser } from "@/utils/drizzle-zod-valids";
import { eq, or } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "@/utils/sign-jwts";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedData = await SignInRouteInputsParser.parseAsync(data);

    // * check if the user exists
    const foundUser = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.userName, parsedData.usernameOrEmail),
          eq(users.email, parsedData.usernameOrEmail)
        )
      );

    // * if he doesn't exist throw a CONFLICTERROR
    if (!foundUser.length) {
      throw new ConflictError();
    }

    // * check if the passwords match
    const pwdMatch = await bcrypt.compare(
      parsedData.password,
      foundUser[0].password
    );

    // * If it doesn't throw a CONFLICTERROR
    if (!pwdMatch) {
      throw new ConflictError();
    }

    // * Create a new REFRESH TOKEN AND SAVE IT IN THE DB
    const { token: refreshToken, expiresIn: refreshExpiresIn } =
      signRefreshToken({ username: foundUser[0].userName });

    await db
      .update(users)
      .set({ refreshToken })
      .where(eq(users.id, foundUser[0].id));

    // * Create a ACCESS TOKEN and SEND IT IN THE RESPONSE AS TOKEN
    // * SEND THE CREATED REFRESH TOKEN AS A COOKIE NAMED REFRESH

    const accessToken = signAccessToken({
      userId: foundUser[0].id,
      username: foundUser[0].userName,
      firstname: foundUser[0].firstname,
      lastname: foundUser[0].lastName,
    });

    cookies().set({
      name: "refresh",
      value: refreshToken,
      httpOnly: true,
      secure: true,
      maxAge: refreshExpiresIn,
      sameSite: "strict",
    });

    return NextResponse.json(
      { success: true, token: accessToken },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON SYNTAX" },
        { status: 400 }
      );
    }
    if (error instanceof ZodError || error instanceof ConflictError) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 409 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Internal Error Happened" },
      { status: 500 }
    );
  }
}
