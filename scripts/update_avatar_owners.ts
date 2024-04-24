import { createPublicClient, getContract, http, Address } from "viem";
import { mainnet } from "viem/chains";
import { avatarABI } from "../abis/avatar";

import { db } from "../db";
import { avatar_owners } from "../db/schema/avatar_owners";
type AvatarOwner = typeof avatar_owners.$inferInsert;

const avatarAddress = process.env.NEXT_PUBLIC_AVATAR_CONTRACT as Address;

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_NETWORK_RPC),
});

const insertOwner = async (owner: AvatarOwner) => {
  return db
    .insert(avatar_owners)
    .values(owner)
    .onDuplicateKeyUpdate({
      set: { address: owner.address },
    });
};

async function run() {
  const blockNumber = await client.getBlockNumber();
  console.log("Current block number:", blockNumber);

  const contract = getContract({
    address: avatarAddress,
    abi: avatarABI,
    client: client,
  });

  const supply = await contract.read.totalSupply();

  if (supply) {
    for (let i = 1; i <= 10; i++) {
      const owner = await contract.read.isTokenMinted([i]);
      if (owner) {
        const ownerAddress = await contract.read.ownerOf([i]);
        if (ownerAddress) {
          await insertOwner({
            id: i,
            address: ownerAddress.toString(),
          });
          console.log(i, "minted:", owner, ownerAddress);
        }
      } else {
        console.log(i, "not minted");
      }
    }
  }

  process.exit(0);
}

run();
