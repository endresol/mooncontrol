"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";

import {
  getDefaultConfig,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

const rainbow_config = getDefaultConfig({
  ...config,
  appName: "MoonControl",
  projectId: "aa05c57bb029900be2fc78b619cd4558",
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to The Test App",
});

export function Providers({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <WagmiProvider config={rainbow_config}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider theme={midnightTheme()}>
              {children}
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </WagmiProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
