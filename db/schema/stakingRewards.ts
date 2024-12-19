import {
  int,
  varchar,
  datetime,
  mysqlTable,
  bigint,
  unique,
} from "drizzle-orm/mysql-core";
//

export const stakingRewards = mysqlTable(
  "staking_rewards",
  {
    rewardId: bigint("reward_id", { mode: "number" })
      .autoincrement()
      .primaryKey(), // Auto-incremented ID
    address: varchar("address", { length: 255 }).notNull(),
    holdingMonth: varchar("holding_month", { length: 7 }).notNull(), // e.g., '2024-09'
    contractAReward: int("contract_a_reward").default(0), // Reward for Contract A
    contractBReward: int("contract_b_reward").default(0), // Reward for Contract B
    contractCReward: int("contract_c_reward").default(0), // Reward for Contract C
    sameIdBonus: int("same_id_bonus").default(0), // Bonus for holding same NFT ID in multiple contracts
    totalReward: int("total_reward").notNull(), // Total reward calculated
    claimStatus: varchar("claim_status", { length: 20 })
      .notNull()
      .default("unclaimed"), // 'unclaimed', 'claimed', 'expired'
    claimExpiry: datetime("claim_expiry").notNull(), // Expiry date (4 weeks from reward availability)
  },
  (table) => {
    return {
      uniqueAddressHoldingMonth: unique().on(table.address, table.holdingMonth),
    };
  }
);

// Define relation to the users table (foreign key)
// export const rewardsRelations = relations(stakingRewards, {
//   staker: { relation: "belongsTo", columns: ["userId"], foreignTable: "staking_users" }
// });
