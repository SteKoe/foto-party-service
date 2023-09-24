import {NextRequest, NextResponse} from "next/server";
import {readToken} from "@/middleware";
import listFiles from "@/app/api/GoogleDriveClient";

export async function GET(request: NextRequest) {
    return NextResponse.json(await listFiles())
}