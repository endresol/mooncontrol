"use server";

import { insertUser, NewUser } from "@/lib/staking";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export async function optinStaking() {
  const session = await getServerSession(options);
  const wallet = session?.user?.name;

  console.log("inside server", wallet);
  if (!wallet) return false;

  const data = {
    address: wallet,
  };

  try {
    const ret = insertUser(data);
    console.log(ret);
    return true;
  } catch (error) {
    console.log(error);
  }
}
