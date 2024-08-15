import "server-only";
import { z, ZodError } from "zod";
import { jwtParser, jwtPayloadParser } from "./zod-valids";
import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from "jsonwebtoken";
import secrets from "./secrets";

export default function verifyAccess(
  token: string
): (z.infer<typeof jwtPayloadParser> & { success: true }) | { success: false } {
  try {
    const parsedToken = jwtParser.parse(token);
    const parsedData = jwtPayloadParser.parse(
      jwt.verify(parsedToken, secrets.ACCESS_SECRET)
    );
    return { ...parsedData, success: true };
  } catch (error) {
    if (
      error instanceof ZodError ||
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError ||
      error instanceof NotBeforeError
    ) {
      return { success: false };
    }
    console.error(error);
    return { success: false };
  }
}
