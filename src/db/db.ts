import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import secrets from "@/utils/secrets";

// * to solve too many connections issue
// * reference - https://github.com/drizzle-team/drizzle-orm/issues/1988#issuecomment-1987634064

function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name];
}

function createDBConnection() {
  const connection = mysql.createPool({
    host: secrets.DB_HOST,
    database: secrets.DB_NAME,
    user: secrets.DB_USER,
    password: secrets.DB_PWD,
    port: secrets.DB_PORT,
    connectionLimit: 10,
  });

  return drizzle(connection);
}

const db = singleton("db", createDBConnection);

export default db;
