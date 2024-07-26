import jwt from "jsonwebtoken";
import secrets from "@/utils/secrets";

export function signRefreshToken(payload: { username: string }) {
  return {
    token: jwt.sign(payload, secrets.REFRESH_SECRET, { expiresIn: "24h" }),
    expiresIn: 24 * 60 * 60,
  };
}

export function signAccessToken(payload: {
  username: string;
  firstname: string;
  lastname: string;
  userId: number;
}) {
  return jwt.sign(payload, secrets.ACCESS_SECRET, { expiresIn: "12h" });
}
