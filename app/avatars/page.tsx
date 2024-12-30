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
  }

  return (
    <>
      <div className="w-full avatar-background">
        {myAvatars.length > 0 ? (
          <AvatarGrid avatars={myAvatars} is3d={true} />
        ) : (
          <div>You do not own any avatars yet.</div>
        )}
      </div>
    </>
  );
}
