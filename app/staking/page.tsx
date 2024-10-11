import React from "react";
import OptinButton from "@/components/OptinButton";
import { isStaker } from "@/lib/staking";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Staking() {
  const session = await getServerSession(options);

  const wallet = session?.user?.name;
  const staker = await isStaker(wallet ?? "");
  console.log("staker: ", staker);

  return (
    <>
      <h2 className="text-2xl">Staking with Bitcoin reward</h2>
      <p className="text-m">
        Finnaly has the day come. Your Moon Ape Lab NFTs will start earning some
        realword BTC.
      </p>
      <p>To get in on the action you have to opt in and keep engaded... </p>

      {!staker ? <OptinButton /> : <p>You are allready earning BTC!</p>}
    </>
  );
}
