import {
  int,
  bigint,
  mysqlTable,
  index,
  varchar,
  unique,
} from "drizzle-orm/mysql-core";

export const nfts_apenft = mysqlTable(
  "nfts_apenft",
  {
    id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
    nft_id: int("nft_id").notNull(),
    address: varchar("address", { length: 256 }),
  },
  (t) => ({
    unq1: unique().on(t.nft_id),
    unq: unique().on(t.nft_id, t.address),
  })
);
