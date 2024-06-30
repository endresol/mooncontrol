import { bigint, mysqlTable, varchar, boolean } from "drizzle-orm/mysql-core";

export const raffle_lottery_tickets = mysqlTable("raffle_lottery_tickets", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  address: varchar("address", { length: 256 }),
  winner: boolean("winner"),
});
