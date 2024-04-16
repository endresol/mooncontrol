import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const dburi = process.env.DATABASE_URL as string;
// create the connection
const poolConnection = mysql.createPool({
  uri: dburi,
});

export const db = drizzle(poolConnection);
