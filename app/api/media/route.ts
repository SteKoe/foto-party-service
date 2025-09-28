import {NextResponse} from "next/server";
import {listFiles, uploadFile} from "@/app/api/PictureProvider";
import {extension} from "mime-types";
import {v4 as uuidv4} from "uuid";
import {Jimp} from "jimp";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

export async function GET() {
  try {
    const contents = await listFiles();
    return NextResponse.json(contents);
  } catch (err) {
    console.error("Error listing files", err);
    return NextResponse.json({ error: 404 }, { status: 404 });
  }
}

export async function PUT(request: Request) {
  try {
    const contentType = request.headers.get("Content-Type");

    if (!contentType || (!contentType.startsWith("image/") && !contentType.startsWith("video/"))) {
      return NextResponse.json(
          { error: "Only image and video files are allowed" },
          { status: 400 }
      );
    }

    const fileExtension = extension(contentType);
    if (!fileExtension) {
      return NextResponse.json(
          { error: "Unsupported Content-Type" },
          { status: 400 }
      );
    }

    // Read the binary file from the request body
    const fileBuffer = await request.arrayBuffer();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Upload the file
    await uploadFile(
        `originals/${fileName}`,
        contentType,
        Buffer.from(fileBuffer)
    );

    const image = await Jimp.read(fileBuffer);
    const size = Number.isInteger(process.env.IMAGE_SCALED_MAX_SIZE) ? Number(process.env.IMAGE_SCALED_MAX_SIZE) : 512;
    image.scaleToFit({
      w: size,
      h: size,
    });
    // Upload the file
    await uploadFile(
        `thumbnails/${fileName}`,
        contentType,
        await image.getBuffer(contentType as any)
    );

    return NextResponse.json({ success: true, fileName });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 });
  }
}