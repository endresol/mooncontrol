import { varchar, timestamp, mysqlTable, serial } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const stakingUsers = mysqlTable("staking_users", {
    id: serial("id").primaryKey(),  // Auto-incremented ID
    address: varchar("address", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  });
  