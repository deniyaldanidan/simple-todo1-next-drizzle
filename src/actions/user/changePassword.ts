"use server";

import verifyAccess from "@/utils/verifyAccess";
import { passwordParser } from "@/utils/zod-valids";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import db from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

type ActionReturnType = Promise<
  { success: false; error: string } | { success: true }
>;

export default async function changePassword(
  token: string,
  password: string
): ActionReturnType {
  try {
    // * verify auth
    const auth = verifyAccess(token);
    if (auth.success === false) {
      return { success: false, error: "Error Happened" };
    }
    // * validate inp-data
    const parsedPWD = passwordParser.parse(password);
    // * hash the password
    const hashedPwd = await bcrypt.hash(parsedPWD, 10);
    // * update the data
    await db
      .update(users)
      .set({
        password: hashedPwd,
      })
      .where(eq(users.id, auth.userId));
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error: "Validation Error" };
    }
    console.log(error);
    return { success: false, error: "Error happened" };
  }
}
