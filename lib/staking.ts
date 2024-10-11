import { db } from "@/db";
import { eq } from "drizzle-orm";
import { stakingUsers } from "@/db/schema/stakingUsers";
import { log } from "console";

export type NewUser = typeof stakingUsers.$inferInsert;

export async function insertUser(user: NewUser) {
  console.log("insertUser", user);

  return db.insert(stakingUsers).values(user);
}

export async function isStaker(address: string) {
  console.log("address:", address);

  const staker = await db
    .select()
    .from(stakingUsers)
    .where(eq(stakingUsers.address, address));

  console.log("loaded staker", staker);

  if (staker.length >= 1) {
    return true;
  } else {
    return false;
  }
}

export async function snapshotWallet(address: string) {
  // find all genesis for wallet
  // store in database
  // find all avatars for wallet
  // store in database
  // find all mutnats for wallet
  // store in database
}
