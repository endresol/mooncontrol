import {
  int,
  bigint,
  mysqlTable,
  index,
  varchar,
} from "drizzle-orm/mysql-core";

export const nfts_apenft = mysqlTable("nfts_apenft", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  nft_id: int("nft_id").notNull(),
  address: varchar("address", { length: 256 }),
});
