"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
import { config } from "@/config";

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

export function Providers({
  children,
  initialState,
}: Readonly<{
  children: React.ReactNode;
  initialState: State | undefined;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={rainbow_config} initialState={initialState}>
        <RainbowKitProvider theme={midnightTheme()}>
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
