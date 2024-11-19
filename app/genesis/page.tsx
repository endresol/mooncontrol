import React from "react";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

import { db } from "../../db";
import { nfts_apenft } from "../../db/schema/nfts_apenft";
import { eq } from "drizzle-orm";

import AvatarGrid from "@/components/AvatarGrid";

type avatar = {
  id: number;
  address: string | null;
};

export default async function Genesis() {
  const session = await getServerSession(options);

  const wallet = session?.user?.name;
  let myAvatars: avatar[] = [];

  if (wallet) {
    const data = await db
      .select()
      .from(nfts_apenft)
      .where(eq(nfts_apenft.address, wallet));

    data.map((row) =>
      myAvatars.push({
        id: row.nft_id,
        address: row.address,
      })
    );
  }

  return (
    <>
      <div className="w-full avatar-background">
        {myAvatars.length > 0 ? (
          <AvatarGrid avatars={myAvatars} is3d={false} />
        ) : (
          <div>You do not own any avatars yet.</div>
        )}
      </div>
    </>
  );
}
