import {
  int,
  varchar,
  datetime,
  mysqlTable,
  index,
} from "drizzle-orm/mysql-core";

export const stakingHoldings = mysqlTable(
  "staking_holdings",
  {
    holdingId: int("holding_id").autoincrement().primaryKey(),
    address: varchar("address", { length: 255 }).notNull(),
    contract: varchar("contract", { length: 255 }).notNull(),
    tokenId: varchar("token_id", { length: 255 }).notNull(),
    snapshotDate: datetime("snapshot_date").notNull(),
    holdingMonth: varchar("holding_month", { length: 7 }).notNull(),
  },
  (table) => ({
    uniqueHolding: index("unique_holding_idx").on(
      table.address,
      table.contract,
      table.tokenId,
      table.holdingMonth
    ),
  })
);
