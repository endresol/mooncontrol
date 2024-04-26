import React from "react";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

import { db } from "../../db";
import { avatar_owners } from "../../db/schema/avatar_owners";
import { eq } from "drizzle-orm";
import { AvatarCard } from "../../components/AvatarCard";

function getShortenedString(str: string) {
  return str.substring(0, 4) + "..." + str.substring(str.length - 4);
}

export default async function Avatars() {
  const session = await getServerSession(options);

  console.log("session", session);

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
      <div className='text-4xl tracking-wider font-bold'>
        3D Avatars for {getShortenedString(session?.user?.name as string)}
      </div>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-6'>
        {avatars?.map((avatar) => (
          <AvatarCard key={avatar.id.toString()} apeId={avatar.id.toString()} />
        ))}
      </div>
    </>
  );
}
