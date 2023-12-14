import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  if (request.method === "GET") {
    try {
      const cloneData = await prisma.clone.findFirst({
        where: {
          token: Number(slug),
        },
      });

      if (!cloneData) {
        return new NextResponse("Clone not found", { status: 404 });
      }

      return NextResponse.json(cloneData);
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Error fetching data" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } else {
    return NextResponse.next();
  }
}
