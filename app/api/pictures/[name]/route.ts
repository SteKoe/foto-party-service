import { NextResponse } from "next/server";
import { deleteFile, getFile } from "@/app/api/PictureProvider";
import sharp from "sharp";

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const preview = new URL(request.url).searchParams.get("preview");
  try {
    let response = await getFile(params.name);

    if (preview !== null && response) {
      response = await sharp(response).resize(240).blur(20).toBuffer();
    }

    return new NextResponse(response);
  } catch (e) {
    return NextResponse.json({ error: 404 }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { name: string } },
) {
  try {
    await deleteFile(params.name);
    return new NextResponse(null, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 404 }, { status: 404 });
  }
}
