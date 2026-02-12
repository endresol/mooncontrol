import React from "react";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

import { db } from "../../db";
import { avatar_owners } from "../../db/schema/avatar_owners";
import { eq } from "drizzle-orm";

import { getResourcesForClient } from "@/lib/resources";
import ResourceGrid from "@/components/ResourceGrid";

export default async function Resources() {
  const session = await getServerSession(options);
  const wallet = session?.user?.name;

  const isLoggedIn = !!wallet;
  let isHolder = false;

  if (wallet) {
    try {
      const owned = await db
        .select({ id: avatar_owners.id })
        .from(avatar_owners)
        .where(eq(avatar_owners.address, wallet))
        .limit(1);

      isHolder = owned.length > 0;
    } catch (error) {
      console.error("Failed to check avatar ownership:", error);
    }
  }

  const resourceList = getResourcesForClient();

  return (
    <div className="w-full avatar-background">
      <ResourceGrid
        resources={resourceList}
        isLoggedIn={isLoggedIn}
        isHolder={isHolder}
      />
    </div>
  );
}
