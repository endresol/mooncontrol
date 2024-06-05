import React from "react";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

import { db } from "../../db";
import { avatar_owners } from "../../db/schema/avatar_owners";
import { eq } from "drizzle-orm";

import AvatarGrid from "@/components/AvatarGrid";

type avatar = {
  id: number;
  address: string | null;
};

export default async function Avatars() {
  const session = await getServerSession(options);

  const wallet = session?.user?.name;
  let myAvatars: avatar[] = [];

  if (wallet) {
    const data = await db
      .select()
      .from(avatar_owners)
      .where(eq(avatar_owners.address, wallet));

    data.map((row) =>
      myAvatars.push({
        id: row.id,
        address: row.address,
      })
    );
  }

  return (
    <>
      <h2 className='text-xl'> My 3D Avatars </h2>
      {myAvatars.length > 0 ? (
        <AvatarGrid avatars={myAvatars} />
      ) : (
        <div>You do not own any avatars yet.</div>
      )}
    </>
  );
}
