import { createPublicClient, getContract, http, Address } from "viem";
import { mainnet } from "viem/chains";
import { genesisABI } from "../abis/genesis";

import { db } from "../db";
import { nfts_apenft } from "../db/schema/nfts_apenft";
type GenesisOwner = typeof nfts_apenft.$inferInsert;

const genesisAddress = process.env.NEXT_PUBLIC_GENESIS_CONTRACT as Address;

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_NETWORK_RPC),
});

const insertOwner = async (owner: GenesisOwner) => {
  return db
    .insert(nfts_apenft)
    .values(owner)
    .onDuplicateKeyUpdate({
      set: { address: owner.address },
    });
};

async function run() {
  const blockNumber = await client.getBlockNumber();
  console.log("Current block number:", blockNumber);

  const contract = getContract({
    address: genesisAddress,
    abi: genesisABI,
    client: client,
  });

  const supply = (await contract.read.totalSupply()) as number;

  if (supply) {
    for (let i = 1; i <= supply; i++) {
      const ownerAddress = await contract.read.ownerOf([i]);
      if (ownerAddress) {
        await insertOwner({
          nft_id: i,
          address: ownerAddress.toString(),
        });
        console.log(i, "minted:", ownerAddress);
      }
    }
  }

  process.exit(0);
}

run();
