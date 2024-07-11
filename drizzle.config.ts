import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST ?? "",
    database: process.env.DB_NAME ?? "",
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PWD ?? "",
    port: isNaN(parseInt(process.env.DB_PORT ?? ""))
      ? 3306
      : parseInt(process.env.DB_PORT ?? ""),
  },
});
