import React from "react";
import OptinButton from "@/components/OptinButton";
import ClaimButton from "@/components/ClaimButton";
import ButtonInfo from "@/components/ButtonInfo";

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
            <div className="card p-4 bg-white text-bison-500 shadow-sm rounded-lg flex justify-between items-center">
              <div>
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
              <ButtonInfo />
            </div>
          </div>
          <div className="min-w-[1100px]">
            <div className="card px-4 py-6 bg-white text-bison-500 shadow-sm rounded-lg min-h-[100px]">
              <h2 className="text-xl uppercase">Step 2 - Unclaimed Earnings</h2>

              {rewards.length > 0 ? (
                <div className="grid grid-rows-1 gap-2">
                  {rewards.map((reward, index) => (
                    <div className="grid grid-cols-7" key={index}>
                      <span className="">Period: {reward.holdingMonth}: </span>
                      <span className="">
                        2Ds: {(reward.genesis / 100).toFixed(2)}
                      </span>
                      <span className="">
                        3Ds: {(reward.avatar / 100).toFixed(2)}
                      </span>
                      <span className="">
                        Pairs: {(reward.matchbonus / 100).toFixed(2)}
                      </span>
                      <span className="">
                        Mutants: {(reward.mutant / 100).toFixed(2)}
                      </span>
                      <span className="">
                        {(reward.total / 100).toFixed(2)}
                      </span>

                      {new Date(reward.expiry) > new Date() ? (
                        <ClaimButton size={"small"} wallet={wallet} />
                      ) : (
                        <span>Expired</span>
                      )}
                    </div>
                  ))}
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
                <div className="grid grid-rows-1">
                  {claimed.map((claim, index) => (
                    <div className="grid grid-cols-6" key={index}>
                      <span className="">Period: {claim.holdingMonth}: </span>
                      <span className="">
                        2Ds: {(claim.genesis / 100).toFixed(2)}
                      </span>
                      <span className="">
                        3Ds: {(claim.avatar / 100).toFixed(2)}
                      </span>
                      <span className="">
                        Pairs: {(claim.matchbonus / 100).toFixed(2)}
                      </span>
                      <span className="">
                        Mutants: {(claim.mutant / 100).toFixed(2)}
                      </span>
                      <span className="">
                        Total $MAD: {(claim.total / 100).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="grid grid-cols-6   justify-between w-full font-bold">
                    <span>Total Claimed:</span>
                    <span>
                      2Ds:{" "}
                      {(
                        claimed.reduce((acc, claim) => acc + claim.genesis, 0) /
                        100
                      ).toFixed(2)}
                    </span>
                    <span>
                      3Ds:{" "}
                      {(
                        claimed.reduce((acc, claim) => acc + claim.avatar, 0) /
                        100
                      ).toFixed(2)}
                    </span>
                    <span>
                      Pairs:{" "}
                      {(
                        claimed.reduce(
                          (acc, claim) => acc + claim.matchbonus,
                          0
                        ) / 100
                      ).toFixed(2)}
                    </span>
                    <span>
                      Mutants:{" "}
                      {(
                        claimed.reduce((acc, claim) => acc + claim.mutant, 0) /
                        100
                      ).toFixed(2)}
                    </span>
                    <span>
                      Total $MAD:{" "}
                      {(
                        claimed.reduce((acc, claim) => acc + claim.total, 0) /
                        100
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
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
