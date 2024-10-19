import { db } from "@/db";
import { eq } from "drizzle-orm";

import {
  nfts_apenft,
  avatar_owners,
  stakingUsers,
  stakingHoldings,
} from "@/db/schema";

import { createPublicClient, getContract, http, Address } from "viem";
import { mainnet } from "viem/chains";
import { mutantABI } from "@/abis/mutant";

const mutantAddress = process.env.NEXT_PUBLIC_MUTANT_CONTRACT as Address;
const genesisAddress = process.env.NEXT_PUBLIC_GENESIS_CONTRACT as Address;
const avatarAddress = process.env.NEXT_PUBLIC_AVATAR_CONTRACT as Address;

export type NewUser = typeof stakingUsers.$inferInsert;

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
      holdingMonth: "2024-09",
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
      holdingMonth: "2024-09",
    });
  });

  const mutants = await getMutants(address);

  mutants.forEach((element) => {
    assets.push({
      address: address,
      contract: mutantAddress,
      tokenId: element,
      snapshotDate: new Date(),
      holdingMonth: "2024-09",
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
