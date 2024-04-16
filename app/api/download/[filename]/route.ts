import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { createPublicClient, getContract, http, Address } from "viem";
import { mainnet } from "viem/chains";
import { avatarABI } from "@/abis/avatar";
const avatarAddress = process.env.NEXT_PUBLIC_AVATAR_CONTRACT as Address;

type GetParams = {
  params: {
    filename: string;
  };
};

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_INFURA_API_KEY),
});

// export an async GET function. This is a convention in NextJS
export async function GET(req: Request, { params }: GetParams) {
  const session = await getServerSession(options);

  const contract = getContract({
    address: avatarAddress,
    abi: avatarABI,
    client: client,
  });

  if (session) {
    const filename = params.filename;
    console.log("Session", JSON.stringify(session, null, 2));
    const minted = await contract.read.isTokenMinted([filename]);
    let owner;
    if (minted) {
      owner = await contract.read.ownerOf([filename]);
    } else {
      owner = null;
    }

    if (owner === session.user?.name) {
      const hiddenfileUrl = `https://storage.moonapelab.io/static/moonapes3d/images/${filename}.png`;

      const response = await fetch(hiddenfileUrl);

      return new Response(response.body, {
        headers: {
          ...response.headers,
          "content-disposition": `attachment; filename="${filename}.png"`,
        },
      });
    } else {
      return new Response("You do not own this NFT", {
        status: 403,
      });
    }
  } else {
    return new Response("Please sign in to download files", {
      status: 401,
    });
  }
}
