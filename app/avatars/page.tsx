import React from "react";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

import { db } from "../../db";
import { avatar_owners } from "../../db/schema/avatar_owners";
import { eq, and, sql } from "drizzle-orm";
import { stakingHoldings } from "../../db/schema/stakingHoldings";

import AvatarGrid from "@/components/AvatarGrid";

type avatar = {
  id: number;
  address: string;
  isStaked: boolean;
  stakedAt: Date | null;
  contract: string;
};

const contract = process.env.NEXT_PUBLIC_AVATAR_CONTRACT;

export default async function Avatars() {
  const session = await getServerSession(options);

  const wallet = session?.user?.name;
  let myAvatars: avatar[] = [];

  if (wallet) {
    try {
      const data = await db
        .selectDistinct({
          id: avatar_owners.id,
          address: avatar_owners.address,
          isStaked: stakingHoldings.tokenId,
          stakedAt: sql<Date>`MIN(${stakingHoldings.snapshotDate})`,
        })
        .from(avatar_owners)
        .leftJoin(
          stakingHoldings,
          and(
            eq(stakingHoldings.tokenId, avatar_owners.id),
            eq(stakingHoldings.address, avatar_owners.address),
            eq(stakingHoldings.contract, contract as string)
          )
        )
        .where(eq(avatar_owners.address, wallet))
        .groupBy(
          avatar_owners.id,
          avatar_owners.address,
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
      console.error("Failed to fetch avatars:", error);
    }
  }

  return (
    <>
      <div className="w-full page-bg bg-avatar">
        {myAvatars.length > 0 ? (
          <AvatarGrid
            avatars={myAvatars}
            is3d={true}
            name="3D Moon Ape Lab Avatar"
          />
        ) : (
          <div>You do not own any avatars yet.</div>
        )}
      </div>
    </>
  );
}
