import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

import { db } from "../../db";
import { nfts_apenft } from "../../db/schema/nfts_apenft";
import { stakingHoldings } from "../../db/schema/stakingHoldings";
import { eq, and, sql } from "drizzle-orm";

import AvatarGrid from "@/components/AvatarGrid";

type avatar = {
  id: number;
  address: string;
  isStaked: boolean;
  stakedAt: Date | null;
  contract: string;
};

const contract = process.env.NEXT_PUBLIC_GENESIS_CONTRACT;

export default async function Genesis() {
  const session = await getServerSession(options);
  const wallet = session?.user?.name;
  let myAvatars: avatar[] = [];

  if (wallet) {
    try {
      const data = await db
        .selectDistinct({
          id: nfts_apenft.nft_id,
          address: nfts_apenft.address,
          isStaked: stakingHoldings.tokenId,
          stakedAt: sql<Date>`MIN(${stakingHoldings.snapshotDate})`,
        })
        .from(nfts_apenft)
        .leftJoin(
          stakingHoldings,
          and(
            eq(stakingHoldings.tokenId, nfts_apenft.nft_id),
            eq(stakingHoldings.address, nfts_apenft.address),
            eq(stakingHoldings.contract, contract as string)
          )
        )
        .where(eq(nfts_apenft.address, wallet))
        .groupBy(
          nfts_apenft.nft_id,
          nfts_apenft.address,
          stakingHoldings.tokenId
        );

      data.map((row) =>
        myAvatars.push({
          id: row.id,
          address: row.address as string,
          isStaked: row.isStaked !== null,
          stakedAt: row.stakedAt,
          contract: contract as string,
        })
      );
    } catch (error) {
      console.error("Failed to fetch genesis NFTs:", error);
    }
  }

  return (
    <>
      <div className="w-full avatar-background">
        {myAvatars.length > 0 ? (
          <AvatarGrid
            avatars={myAvatars}
            is3d={false}
            name="Gensis Moon Ape Lab"
          />
        ) : (
          <div>You do not own any avatars yet.</div>
        )}
      </div>
    </>
  );
}
