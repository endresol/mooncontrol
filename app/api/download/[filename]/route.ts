import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { createPublicClient, getContract, http, Address } from "viem";
import { mainnet } from "viem/chains";
import { avatarABI } from "@/abis/avatar";

import fs from "fs";
import path from "path";

const avatarAddress = process.env.NEXT_PUBLIC_AVATAR_CONTRACT as Address;
const avatarFolder = process.env.AVATAR_BLENDER_FOLDER;

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
      // const hiddenfileUrl = `https://storage.moonapelab.io/static/moonapes3d/images/${filename}.png`;
      const filePath = path.resolve(`${avatarFolder}/${filename}.blend`);
      const imageBuffer = fs.readFileSync(filePath);

      const response = new Response(imageBuffer, {
        headers: {
          "Content-Type": "application/octet-stream",
          "content-disposition": `attachment; filename="${filename}.blend"`,
        },
      });

      return response;
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
