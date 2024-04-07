import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

type GetParams = {
  params: {
    filename: string;
  };
};

// export an async GET function. This is a convention in NextJS
export async function GET(req: Request, { params }: GetParams) {
  // filename for the file that the user is trying to download
  const session = await getServerSession(options);
  if (session) {
    // Signed in
    const filename = params.filename;
    console.log("Session", JSON.stringify(session, null, 2));

    // external file URL
    const hiddenfileUrl = `https://storage.moonapelab.io/static/moonapes3d/images/${filename}.png`;

    // use fetch to get a response
    const response = await fetch(hiddenfileUrl);

    // return a new response but use 'content-disposition' to suggest saving the file to the user's computer
    return new Response(response.body, {
      headers: {
        ...response.headers, // copy the previous headers
        "content-disposition": `attachment; filename="${filename}.png"`,
      },
    });
  } else {
    // Not Signed in
    return new Response("Please sign in to download files", {
      status: 401,
    });
  }
}
