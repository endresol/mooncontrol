import { int, mysqlTable, index, varchar } from "drizzle-orm/mysql-core";

export const avatar_owners = mysqlTable(
  "avatar_owners",
  {
    id: int("id").primaryKey(),
    address: varchar("address", { length: 256 }),
  },
  (avatar_owners) => ({
    ownerIndex: index("address_idx").on(avatar_owners.address),
  })
);
