import {NextRequest, NextResponse} from "next/server";
import exp from "constants";

const TOKEN_PARAM_NAME = 'token';

export function readToken(request: NextRequest) {
    const cookie = request.cookies.get(TOKEN_PARAM_NAME)
    return new URL(request.url).searchParams.get(TOKEN_PARAM_NAME) || cookie?.value;
}

export function middleware(request: NextRequest) {
    const authToken = readToken(request);

    if (authToken && authToken === process.env.AUTH_TOKEN) {
        const response = NextResponse.next();
        const maxAge = Number(process.env.AUTH_TOKEN_SECONDS ?? 60 * 60 * 24);

        response.cookies.set({
            name: TOKEN_PARAM_NAME,
            value: process.env.AUTH_TOKEN,
            path: '/',
            maxAge
        })
        
        return response
    }
}
