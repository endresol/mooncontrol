import {
  int,
  bigint,
  mysqlTable,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const mal_spending = mysqlTable("mal_spending", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  address: varchar("address", { length: 256 }),
  amount: int("quantity"),
  transactiontime: timestamp("transactiontime").notNull().defaultNow(),
});
