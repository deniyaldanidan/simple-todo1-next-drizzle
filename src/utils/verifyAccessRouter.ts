import { headers } from "next/headers";
import { bearerParser } from "@/utils/zod-valids";
import verifyAccess from "@/utils/verifyAccess";

export default function verifyAccessRouter() {
  const headersList = headers();
  const authHeader =
    headersList.get("authorization") || headersList.get("Authorization");

  const parsedToken = bearerParser.safeParse(authHeader);

  if (!parsedToken.success) {
    return { success: false as const };
  }
  const result = verifyAccess(parsedToken.data);
  return result;
}
