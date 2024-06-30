import { int, mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const raffle_prizes = mysqlTable("raffle_prizes", {
  id: int("id").autoincrement().primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  prize: varchar("prize", { length: 256 }),
  winner: varchar("winner", { length: 256 }),
  ticket: int("ticket"),
});
