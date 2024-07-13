import { NextResponse } from "next/server";
import { deleteFile, getFile } from "@/app/api/PictureProvider";

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
