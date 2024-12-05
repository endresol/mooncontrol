"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import { claimStakingReward } from "@/app/staking/server_actions";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

const initialState = {
  result: false,
};

function ClaimButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="uppercase text-2xl border-2 border-bison-200 text-bison-300 rounded-xl py-2 px-4 hover:bg-bison-200 hover:text-bison-500"
      aria-disabled={pending}
    >
      Claim
    </button>
  );
}

type props = {
  wallet: string | undefined | null;
};

export default function OptinButton(props: props) {
  console.log("inside wallet is ", props.wallet);
  const [state, formAction] = useFormState(claimStakingReward, true);

  return (
    <form action={formAction}>
      <input type="hidden" name="wallet" value={props.wallet ?? ""} />
      <ClaimButton />
    </form>
  );
}
