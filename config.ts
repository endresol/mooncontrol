import { createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { createClient, http } from "viem";

export const config = createConfig({
  chains: [mainnet],
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(process.env.NEXT_PUBLIC_NETWORK_RPC),
    });
  },
});
