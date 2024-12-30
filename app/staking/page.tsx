import React from "react";
import OptinButton from "@/components/OptinButton";
import ClaimButton from "@/components/ClaimButton";
import {
  getClaimableRewards,
  getClaimedRewards,
  isStaker,
  Rewards as Rewards,
} from "@/lib/staking";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Staking() {
  const session = await getServerSession(options);

  const wallet = session?.user?.name;
  console.log("this wallet", wallet);
  const staker = await isStaker(wallet ?? "");
  console.log("staker: ", staker);

  const rewards: Rewards[] = await getClaimableRewards(wallet ?? "");
  const claimed: Rewards[] = await getClaimedRewards(wallet ?? "");

  return (
    <>
      <div className="w-full staking-background">
        <div className="flex flex-col relative z-10 items-center justify-center gap-8 min-w-[1100px]">
          <div className="min-w-[1100px]">
            <div className="card p-4 bg-white text-bison-500 shadow-sm rounded-lg">
              <h2 className="text-xl uppercase">Step 1 - Opt-in</h2>
              {!staker ? (
                <>
                  <div className="text-center pt-4">
                    <OptinButton wallet={wallet} />
                  </div>
                </>
              ) : (
                <p>Congratulations - you’re all set!</p>
              )}
            </div>
          </div>
          <div className="min-w-[1100px]">
            <div className="card px-4 py-6 bg-white text-bison-500 shadow-sm rounded-lg min-h-[100px]">
              <h2 className="text-xl uppercase">Step 2 - Unclaimed Earnings</h2>

              {rewards.length > 0 ? (
                <div>
                  <span className="">
                    {(rewards[0].total / 100).toFixed(2)}
                  </span>
                  <ClaimButton wallet={wallet} />
                </div>
              ) : (
                <span>No unclaimed rewards</span>
              )}
            </div>
          </div>
          <div className="min-w-[1100px]">
            <div className="card px-4 py-6 bg-white text-bison-500 shadow-sm rounded-lg min-h-[100px]">
              <h2 className="text-xl uppercase">Step 3 - Claimed earnings</h2>
              {claimed.length > 0 ? (
                <span className="">
                  Period: {claimed[0].holdingMonth} -{" "}
                  {(claimed[0].total / 100).toFixed(2)} $MAD
                </span>
              ) : (
                <p>No claimed rewards</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
