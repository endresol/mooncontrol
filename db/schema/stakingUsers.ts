import { varchar, timestamp, mysqlTable, bigint } from "drizzle-orm/mysql-core";

export const stakingUsers = mysqlTable("staking_users", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(), // Auto-incremented ID
  address: varchar("address", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
