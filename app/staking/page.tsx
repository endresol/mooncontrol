import React from "react";
import OptinButton from "@/components/OptinButton";
import { isStaker } from "@/lib/staking";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Staking() {
  const session = await getServerSession(options);

  const wallet = session?.user?.name;
  console.log("this wallet", wallet);
  const staker = await isStaker(wallet ?? "");
  console.log("staker: ", staker);

  return (
    <>
      <div className="w-full staking-background">
        <div className="grid grid-cols-12 gap-4 relative z-10 place-items-end h-[20rem]">
          <div className="col-start-2 col-end-5">
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
          <div className="grid grid-row-2 gap-4 text-center col-start-9 col-end-12">
            <div className="card px-4 py-6 bg-white text-bison-500 shadow-sm rounded-lg  min-h-[150px] flex flex-col justify-between">
              <h2 className="text-xl uppercase">
                Step 2<br />
                Current earnings
              </h2>
              <p>Coming soon</p>
            </div>
            <div className="card px-4 py-6 bg-white text-bison-500 shadow-sm rounded-lg min-h-[150px] flex flex-col justify-between">
              <h2 className="text-xl uppercase">
                Step 3
                <br />
                Claimed earnings
              </h2>
              <p>Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
