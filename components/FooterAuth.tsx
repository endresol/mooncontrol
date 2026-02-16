"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function FooterAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return <ConnectButton label="Login" showBalance={false} />;
  }

  return (
    <Link className="z-20" href="/api/auth/signout?callbackUrl=/">
      <span className="inline-block min-w-44 text-center py-3 bg-white text-bison-300 uppercase text-2xl font-bold rounded-3xl hover:bg-bison-200 hover:text-bison-500 transition-colors z-20">
        Logout
      </span>
    </Link>
  );
}
