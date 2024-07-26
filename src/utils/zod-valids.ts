import { z } from "zod";
import validator from "validator";

const nameParser = z
  .string()
  .min(1, "atleast 1 char required")
  .max(30, "exceed limit of 30 chars")
  .refine((val) => validator.isAlpha(val), "only chars a-zA-Z are allowed");

const userNameParser = z
  .string()
  .min(3, "atleast 3 chars required")
  .max(30, "exceed limit of 30 chars.")
  .refine(
    (val) => validator.isAlphanumeric(val, "en-US", { ignore: "-_" }),
    "only chars a-zA-Z0-9_- are allowed"
  );

export const signUpPageinputsParser = z.object({
  firstname: nameParser,
  lastName: nameParser,
  userName: userNameParser,
  email: z.string().email(),
  password: z
    .string()
    .max(30, "exceed limit of 30 chars")
    .refine(
      (val) => validator.isStrongPassword(val, { minLength: 8 }),
      "password is too weak"
    ),
});

export type SignUpPageinputsError = z.inferFlattenedErrors<
  typeof signUpPageinputsParser
>["fieldErrors"];

export const signInPageInputParser = z.object({
  usernameOrEmail: z.string().min(1),
  password: z.string().min(1),
});

export const jwtPayloadParser = z.object({
  userId: z.number().int(),
  username: userNameParser,
  firstname: nameParser,
  lastname: nameParser,
});

export const refershPayloadParser = z.object({
  username: userNameParser,
});
