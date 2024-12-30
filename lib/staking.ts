"use server";
import { db } from "../db";
import { stakingRewards } from "../db/schema";
import { and, ne, eq, lt, sql } from "drizzle-orm";
import {
  nfts_apenft,
  avatar_owners,
  stakingUsers,
  stakingHoldings,
} from "../db/schema";

import { createPublicClient, getContract, http, Address } from "viem";
import { mainnet } from "viem/chains";
import { mutantABI } from "../abis/mutant";

const mutantAddress = process.env.NEXT_PUBLIC_MUTANT_CONTRACT as Address;
const genesisAddress = process.env.NEXT_PUBLIC_GENESIS_CONTRACT as Address;
const avatarAddress = process.env.NEXT_PUBLIC_AVATAR_CONTRACT as Address;

export type NewUser = typeof stakingUsers.$inferInsert;
export type NewHolding = typeof stakingHoldings.$inferInsert;

export type Rewards = {
  address: string;
  avatar: number;
  mutant: number;
  genesis: number;
  matchbonus: number;
  total: number;
  status: string;
  holdingMonth: string;
};

export async function insertUser(user: NewUser) {
  console.log("insertUser", user);
  const result = await db.insert(stakingUsers).values(user);
  console.log("insertUser result", result);

  if (result[0].insertId) {
    if (user.address) {
      const makeSnapshot = await snapshotWallet(user.address);

      const insertSnapshot = await db.insert(stakingHoldings).values(
        makeSnapshot.map((snapshot) => ({
          ...snapshot,
          tokenId: snapshot.tokenId.toString(),
        }))
      );
    }
  }
}

export async function stakeNFT(holding: NewHolding) {
  console.log("stakeNFT", holding);

  const result = await db.insert(stakingHoldings).values(holding);
  return result;
}

export async function isStaker(address: string) {
  console.log("address:", address);

  const staker = await db
    .select()
    .from(stakingUsers)
    .where(eq(stakingUsers.address, address));

  console.log("loaded staker", staker);

  if (staker.length >= 1) {
    return staker[0].createdAt?.toDateString();
  } else {
    return false;
  }
}

function holdingMonth(date: Date) {
  // Create new date to avoid modifying original
  const prevMonth = new Date(date);
  // Set to previous month
  prevMonth.setMonth(prevMonth.getMonth() - 1);

  // Get year and month (adding 1 since getMonth() returns 0-11)
  const year = prevMonth.getFullYear();
  // Pad month with leading zero if needed
  const month = String(prevMonth.getMonth() + 1).padStart(2, "0");

  // Return in format YYYY-MM
  return `${year}-${month}`;
}

export async function snapshotWallet(address: string) {
  console.log("snapshotWallet", address);

  const assets: {
    address: string;
    contract: `0x${string}`;
    tokenId: number;
    snapshotDate: Date;
    holdingMonth: string;
  }[] = [];

  const genesis = await db
    .select()
    .from(nfts_apenft)
    .where(eq(nfts_apenft.address, address));

  genesis.forEach((element) => {
    assets.push({
      address: address,
      contract: genesisAddress,
      tokenId: element.nft_id,
      snapshotDate: new Date(),
      holdingMonth: holdingMonth(new Date()),
    });
  });

  const avatar = await db
    .select()
    .from(avatar_owners)
    .where(eq(avatar_owners.address, address));

  console.log("loaded avatar", avatar);

  avatar.forEach((element) => {
    assets.push({
      address: address,
      contract: avatarAddress,
      tokenId: element.id,
      snapshotDate: new Date(),
      holdingMonth: holdingMonth(new Date()),
    });
  });

  const mutants = await getMutants(address);

  mutants.forEach((element) => {
    assets.push({
      address: address,
      contract: mutantAddress,
      tokenId: element,
      snapshotDate: new Date(),
      holdingMonth: holdingMonth(new Date()),
    });
  });

  return assets;
}

async function getMutants(address: string) {
  const mutants = [];

  const client = createPublicClient({
    chain: mainnet,
    transport: http(process.env.NEXT_PUBLIC_NETWORK_RPC),
  });

  const contract = getContract({
    address: mutantAddress,
    abi: mutantABI,
    client: client,
  });

  const ownedMutants = await contract.read.balanceOf([address]);

  for (let index = 0; index < Number(ownedMutants); index++) {
    const mutantId = await contract.read.tokenOfOwnerByIndex([address, index]);
    console.log("mutantId", mutantId);
    mutants.push(Number(mutantId));
  }

  console.log("owned mutants", mutants);

  return mutants;
}

export async function getUnclaimedRewards(address: string) {
  const rewards = await db
    .select()
    .from(stakingRewards)
    .where(
      and(
        eq(stakingRewards.address, address),
        ne(stakingRewards.claimStatus, "claimed")
      )
    );

  return rewards;
}

export async function getAllClaimedRewards(address: string) {
  const rewards = await db
    .select()
    .from(stakingRewards)
    .where(
      and(
        eq(stakingRewards.address, address),
        eq(stakingRewards.claimStatus, "claimed")
      )
    );

  return rewards;
}

export async function getClaimableRewards(address: string): Promise<Rewards[]> {
  const result: Rewards[] = [];
  const rewards = await getUnclaimedRewards(address);

  rewards.forEach((reward) => {
    const claimableReward = {
      address: address,
      avatar: reward.contractAReward || 0,
      mutant: reward.contractCReward || 0,
      genesis: reward.contractBReward || 0,
      matchbonus: reward.sameIdBonus || 0,
      total: reward.totalReward || 0,
      status: reward.claimStatus || "unclaimed",
      holdingMonth: reward.holdingMonth,
    };
    result.push(claimableReward);
  });

  return result;
}
export async function getClaimedRewards(address: string): Promise<Rewards[]> {
  const result: Rewards[] = [];
  const rewards = await getAllClaimedRewards(address);

  rewards.forEach((reward) => {
    const claimedReward = {
      address: address,
      avatar: reward.contractAReward || 0,
      mutant: reward.contractCReward || 0,
      genesis: reward.contractBReward || 0,
      matchbonus: reward.sameIdBonus || 0,
      total: reward.totalReward || 0,
      status: reward.claimStatus || "unclaimed",
      holdingMonth: reward.holdingMonth,
    };
    result.push(claimedReward);
  });

  return result;
}

export async function claimReward(address: string) {
  const today = new Date();

  return db
    .update(stakingRewards)
    .set({
      claimStatus: "claimed",
    })
    .where(
      and(
        eq(stakingRewards.address, address),
        eq(stakingRewards.claimStatus, "unclaimed"),
        lt(sql`${today}`, stakingRewards.claimExpiry)
      )
    );
}
