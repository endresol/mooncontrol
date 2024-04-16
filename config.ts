import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet],
  ssr: true,
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_NETWORK_RPC),
  },
});
