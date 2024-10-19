"use server";

import { insertUser, NewUser } from "@/lib/staking";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";

export async function optinStaking() {
  const session = await getServerSession(options);
  const wallet = session?.user?.name;

  console.log("inside server", wallet);
  if (!wallet) return false;

  const data = {
    address: wallet,
  };

  try {
    const ret = await insertUser(data);
    console.log(ret);
    revalidatePath("/");
    return true;
  } catch (error) {
    console.log(error);
  }
}