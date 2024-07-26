import "server-only";
import { users } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import validator from "validator";

/**
 ** signUpSchema
 ** firstname - string | trim | lowercase | length - 1 to 30 | only a-zA-Z
 ** lastName - string | trim | lowercase | length - 1 to 30 | only a-zA-Z
 ** userName - string | trim | length - 3 to 30 | only a-zA-Z0-9_-
 ** email - string | length - 8 to 30 | strong-password
 */

export const signUpSchema = createInsertSchema(users, {
  firstname: (schema) =>
    schema.firstname
      .trim()
      .toLowerCase()
      .min(1, "atleast 1 char required")
      .max(30, "exceed limit of 30 chars")
      .refine((val) => validator.isAlpha(val), "only chars a-zA-Z are allowed"),
  lastName: (schema) =>
    schema.lastName
      .trim()
      .toLowerCase()
      .min(1, "atleast 1 char required")
      .max(30, "exceed limit of 30 chars")
      .refine((val) => validator.isAlpha(val), "only chars a-zA-Z are allowed"),
  userName: (schema) =>
    schema.userName
      .trim()
      .min(3, "atleast 3 chars required")
      .max(30, "exceed limit of 30 chars")
      .refine(
        (val) => validator.isAlphanumeric(val, "en-US", { ignore: "-_" }),
        "only chars a-zA-Z0-9_- are allowed"
      ),
  email: (schema) => schema.email.email(),
  password: (schema) =>
    schema.password
      .max(30, "exceeded limit of 30 chars")
      .refine(
        (val) => validator.isStrongPassword(val, { minLength: 8 }),
        "password is too weak"
      ),
});

export const SignInRouteInputsParser = z.object({
  usernameOrEmail: z
    .string()
    .max(30)
    .refine((val) => validator.isAlphanumeric(val, "en-US", { ignore: "-_" }))
    .or(z.string().email()),
  password: z.string().min(1).max(30),
});
