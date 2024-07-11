import {
  int,
  mysqlTable,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement().notNull(),
  firstname: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  userName: varchar("userName", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 500 }).notNull().unique(),
  password: varchar("password", { length: 750 }).notNull(),
  refreshToken: varchar("refreshToken", { length: 750 }),
});

export const projects = mysqlTable("projects", {
  id: int("id").primaryKey().autoincrement().notNull(),
  name: varchar("name", { length: 1000 }).notNull(),
  description: varchar("description", { length: 3000 }),
  note: text("note"),
  colorCode: varchar("colorCode", { length: 25 }).notNull(),
  archived: boolean("archived").default(false).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  archivedAt: timestamp("archivedAt", { mode: "date" }),
  userId: int("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const tasks = mysqlTable("tasks", {
  id: int("id").primaryKey().autoincrement().notNull(),
  name: varchar("name", { length: 1000 }).notNull(),
  note: text("note"),
  done: boolean("done").notNull().default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  due: timestamp("due", { mode: "date" }),
  projectId: int("projectId")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
});
