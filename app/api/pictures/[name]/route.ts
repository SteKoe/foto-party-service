import { NextResponse } from "next/server";
import { getFile } from "@/app/api/PictureProvider";

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  try {
    const response = await getFile(params.name);

    return new NextResponse(response);
  } catch (e) {
    return NextResponse.json({ error: 404 }, { status: 404 });
  }
}
