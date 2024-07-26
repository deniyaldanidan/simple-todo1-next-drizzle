import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import secrets from "@/utils/secrets";

const connection = mysql.createPool({
  host: secrets.DB_HOST,
  database: secrets.DB_NAME,
  user: secrets.DB_USER,
  password: secrets.DB_PWD,
  port: secrets.DB_PORT,
});

const db = drizzle(connection);

export default db;
