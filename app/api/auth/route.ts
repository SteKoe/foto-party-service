import {NextRequest, NextResponse} from "next/server";
import {readToken} from "@/middleware";
import main from "@/app/api/GoogleDriveClient";

export async function GET(request: NextRequest) {
    const token = readToken(request);
    
    await main()
    
    return NextResponse.json({
        authorized: token === process.env.AUTH_TOKEN
    });
}