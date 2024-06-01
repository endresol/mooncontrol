import { int, bigint, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const raffle_tickets = mysqlTable("raffle_tickets", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  address: varchar("address", { length: 256 }),
  quantity: int("quantity"),
  raffle_id: int("raffle_id"),
  transaction: varchar("transaction", { length: 150 }),
});
