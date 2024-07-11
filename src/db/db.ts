import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: isNaN(parseInt(process.env.DB_PORT ?? ""))
    ? 3306
    : parseInt(process.env.DB_PORT ?? ""),
});

const db = drizzle(connection);

export default db;
