import { NextResponse } from "next/server";
import { listFiles } from "@/app/api/PictureProvider";

export const revalidate = 1;

export async function GET() {
  try {
    const contents = await listFiles();
    return NextResponse.json(contents);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 404 }, { status: 404 });
  }
}
