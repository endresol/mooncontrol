"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import { optinStaking } from "@/app/staking/server_actions";

export default function OptinButton() {
  return (
    <Link
      className={`text-xl gap-4 ${buttonVariants({
        variant: "outline",
        size: "lg",
      })}`}
      href="#"
      onClick={async () => {
        await optinStaking();
      }}
    >
      Yes, I want in!
    </Link>
  );
}
