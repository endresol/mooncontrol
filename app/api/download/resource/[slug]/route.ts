import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { createPublicClient, getContract, http, Address } from "viem";
import { mainnet } from "viem/chains";
import { avatarABI } from "@/abis/avatar";

import { getResourceBySlug } from "@/lib/resources";

const avatarAddress = process.env.NEXT_PUBLIC_AVATAR_CONTRACT as Address;

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_NETWORK_RPC),
});

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(req: Request, { params }: RouteParams) {
  const session = await getServerSession(options);

  if (!session?.user?.name) {
    return new Response("Please sign in to download files", { status: 401 });
  }

  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return new Response("Resource not found", { status: 404 });
  }

  const contract = getContract({
    address: avatarAddress,
    abi: avatarABI,
    client: client,
  });

  const balance = await contract.read.balanceOf([
    session.user.name as Address,
  ]);

  if (Number(balance) === 0) {
    return new Response("You must own an Avatar NFT to download resources", {
      status: 403,
    });
  }

  // Fetch file from external storage and stream to client
  const fileResponse = await fetch(resource.fileUrl);

  if (!fileResponse.ok) {
    return new Response("File not available", { status: 502 });
  }

  return new Response(fileResponse.body, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${resource.fileName}"`,
    },
  });
}
