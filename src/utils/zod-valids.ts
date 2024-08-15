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

export const intParser = z
  .number()
  .int()
  .or(
    z.string().transform((val, ctx) => {
      const parsedInt = parseInt(val);
      if (isNaN(parsedInt)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Not a number",
        });
        return z.NEVER;
      }
      return parsedInt;
    })
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

export const noteInpParser = z
  .string()
  .max(10000, "exceeded limit of 10000 characters");

export const createProjectParser = z.object({
  name: z
    .string()
    .min(1, "field is required")
    .max(1000, "exceed limit of 1000 characters"),
  description: z
    .string()
    .min(1, "field is required")
    .max(3000, "exceed limit of 3000 characters"),
  note: noteInpParser,
  colorCode: z
    .string()
    .max(9, "Invalid color code")
    .refine((val) => validator.isHexColor(val), "Invalid color code"),
});

export type createProjectError = z.inferFlattenedErrors<
  typeof createProjectParser
>["fieldErrors"];

export const createProjectRouteParser = createProjectParser.extend({
  name: z
    .string()
    .min(1, "field is required")
    .max(1000, "exceed limit of 1000 characters")
    .toLowerCase(),
});

export const editProjectRouteParser = createProjectRouteParser.extend({
  projectId: intParser,
});

export const jwtParser = z
  .string({ message: "not a string" })
  .refine((val) => validator.isJWT(val), "invalid jwt");

export const bearerParser = z
  .string()
  .startsWith("Bearer ")
  .transform((val) => val.split(" ")[1]);

export const taskInpsParser = z.object({
  name: z
    .string({ message: "value should be string" })
    .min(1, "Task name is required"),
  due: z.string().transform((val) => {
    const date = new Date(val);
    if (isNaN(date.getDate())) {
      return undefined;
    }
    return date.toISOString();
  }),
});

export type taskInpsError = z.inferFlattenedErrors<
  typeof taskInpsParser
>["fieldErrors"];

export const addTaskParser = z.object({
  name: z.string().min(1).max(1000),
  due: z.string().datetime().optional(),
  projectId: intParser,
});

export const editTaskParser = addTaskParser.extend({
  taskId: intParser,
});

export const editProjectNoteParser = z.object({
  note: noteInpParser,
  projectId: intParser,
});

export const editTaskNoteParser = z.object({
  note: noteInpParser,
  projectId: intParser,
  taskId: intParser,
});
