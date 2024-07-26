import "server-only";
import { z } from "zod";

const secretsParser = z.object({
  DB_HOST: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PWD: z.string().min(1),
  DB_PORT: z
    .string()
    .default("3306")
    .transform((val) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        return 3306;
      }
      return parsed;
    }),
  REFRESH_SECRET: z.string().min(1),
  ACCESS_SECRET: z.string().min(1),
});

const parsedSecrets = secretsParser.safeParse({
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PWD: process.env.DB_PWD,
  DB_PORT: process.env.DB_PORT,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
});

if (!parsedSecrets.success) {
  console.error(parsedSecrets.error.flatten().fieldErrors);
  throw new Error("some environment variables are missing");
}

// console.log(parsedSecrets.data);

const secrets = parsedSecrets.data;

export default secrets;
