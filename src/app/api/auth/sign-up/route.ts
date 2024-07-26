import db from "@/db/db";
import { users } from "@/db/schema";
import { signUpSchema } from "@/utils/drizzle-zod-valids";
import { eq, or } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { signAccessToken, signRefreshToken } from "@/utils/sign-jwts";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedData = await signUpSchema.parseAsync(data);

    // * Check if user already exists
    const foundUser = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.userName, parsedData.userName),
          eq(users.email, parsedData.email)
        )
      );

    // * if user is found send an conflict error
    if (foundUser.length) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // * if no such user has found. hash the pwd and create refresh-token and save the user in db
    const hashedPWD = await bcrypt.hash(parsedData.password, 10);
    const { token: refreshToken, expiresIn: refreshExpiresIn } =
      signRefreshToken({
        username: parsedData.userName,
      });

    const savedUser = await db
      .insert(users)
      .values({
        firstname: parsedData.firstname,
        lastName: parsedData.lastName,
        userName: parsedData.userName,
        email: parsedData.email,
        password: hashedPWD,
        refreshToken,
      })
      .$returningId();

    if (!savedUser.length) {
      throw new Error("Error happened in insert query. No Id's found");
    }

    // * Create Access token and send it to browser in the response
    const accessToken = signAccessToken({
      userId: savedUser[0].id,
      username: parsedData.userName,
      firstname: parsedData.firstname,
      lastname: parsedData.lastName,
    });

    // * send the refresh token as http-only cookie to the browser
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
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON SYNTAX" },
        { status: 400 }
      );
    }
    if (error instanceof ZodError) {
      const parsedErrors = error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", ...parsedErrors },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Internal error happened." },
      { status: 500 }
    );
  }
}
