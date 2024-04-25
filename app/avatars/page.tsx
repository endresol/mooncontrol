import React from "react";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { db } from "@/db";
import { avatar_owners } from "@/db/schema/avatar_owners";
import { eq } from "drizzle-orm";
import { AvatarCard } from "@/components/AvatarCard";

export default async function Avatars() {
  const session = await getServerSession(options);
  const wallet = session?.user?.name;
  let avatars;
  console.log("first");

  if (wallet) {
    avatars = await db
      .select()
      .from(avatar_owners)
      .where(eq(avatar_owners.address, wallet));
    console.log("avatars:", avatars);
  }

  return (
    <>
      <div>3d Avatars {session?.user?.name}</div>
      <div className='grid grid-cols-5 gap-4 md:grid-cols-3 sm:grid-cols-1'>
        {avatars?.map((avatar) => (
          <AvatarCard key={avatar.id.toString()} apeId={avatar.id.toString()} />
        ))}
      </div>
    </>
  );
}
