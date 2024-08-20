"use server";

import db from "@/db/db";
import { users } from "@/db/schema";
import verifyAccess from "@/utils/verifyAccess";
import { eq } from "drizzle-orm";

type ActionReturnType = Promise<
  { success: false; error: string } | { success: true }
>;

export default async function deleteAccount(token: string): ActionReturnType {
  try {
    // * verify auth
    const auth = verifyAccess(token);
    if (auth.success === false) {
      return { success: false, error: "Authentication failed" };
    }
    // * delete the user
    await db.delete(users).where(eq(users.id, auth.userId));
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Error happened" };
  }
}
