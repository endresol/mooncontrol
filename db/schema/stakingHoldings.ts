import { bigint, varchar, datetime, mysqlTable } from "drizzle-orm/mysql-core";

// NFT Holdings Table (MySQL)
export const stakingHoldings = mysqlTable("staking_holdings", {
  holdingId: bigint("holding_id", { mode: "number" })
    .autoincrement()
    .primaryKey(), // Auto-incremented ID
  address: varchar("address", { length: 255 }).notNull(),
  contract: varchar("contract", { length: 255 }).notNull(), // Contract address
  tokenId: varchar("token_id", { length: 255 }).notNull(), // Unique NFT ID
  snapshotDate: datetime("snapshot_date").notNull(), // Date of the snapshot (end of month)
  holdingMonth: varchar("holding_month", { length: 7 }).notNull(), // e.g., '2024-09'
});

// Define relation to the users table (foreign key)
// export const nftHoldingsRelations = relations(stakingHoldings, {
//   staker: { relation: "belongsTo", columns: ["userId"], foreignTable: "staking_users" }
// });
