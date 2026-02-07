"use server";

import {
  insertUser,
  claimReward,
  stakeNFT,
  NewHolding,
} from "@/lib/staking";
import { holdingMonth } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";

export async function optinStaking() {
  const session = await getServerSession(options);
  const wallet = session?.user?.name;

  if (!wallet) return { success: false, error: "Not authenticated" };

  try {
    await insertUser({ address: wallet });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("optinStaking failed:", error);
    return { success: false, error: "Failed to opt in to staking" };
  }
}

export async function claimStakingReward() {
  const session = await getServerSession(options);
  const wallet = session?.user?.name;

  if (!wallet) return { success: false, error: "Not authenticated" };

  try {
    await claimReward(wallet);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("claimStakingReward failed:", error);
    return { success: false, error: "Failed to claim reward" };
  }
}

export async function addHolding(
  tokenId: number,
  address: string,
  contract: string
) {
  const session = await getServerSession(options);
  const wallet = session?.user?.name;
  if (!wallet) return { success: false, error: "Not authenticated" };

  if (wallet.toLowerCase() !== address.toLowerCase()) {
    return { success: false, error: "Address mismatch" };
  }

  if (!address.match(/^0x[a-fA-F0-9]{40}$/))
    return { success: false, error: "Invalid address" };
  if (!contract.match(/^0x[a-fA-F0-9]{40}$/))
    return { success: false, error: "Invalid contract" };
  if (!Number.isInteger(tokenId) || tokenId < 0)
    return { success: false, error: "Invalid tokenId" };

  const holding: NewHolding = {
    address,
    holdingMonth: holdingMonth(new Date()),
    contract,
    tokenId: tokenId.toString(),
    snapshotDate: new Date(),
  };

  try {
    await stakeNFT(holding);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("addHolding failed:", error);
    return { success: false, error: "Failed to add holding" };
  }
}
