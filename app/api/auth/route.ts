import {NextRequest, NextResponse} from "next/server";
import {readToken} from "@/middleware";

export async function GET(request: NextRequest) {
    const token = readToken(request);
    
    return NextResponse.json({
        authorized: token === process.env.AUTH_TOKEN
    });
}