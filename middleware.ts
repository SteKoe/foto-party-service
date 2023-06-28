import {NextRequest, NextResponse} from "next/server";

const TOKEN_PARAM_NAME = 'token';

export function readToken(request: NextRequest) {
    const cookie = request.cookies.get(TOKEN_PARAM_NAME)
    return new URL(request.url).searchParams.get(TOKEN_PARAM_NAME) || cookie?.value;
}

export function middleware(request: NextRequest) {
    const authToken = readToken(request);
    let isAuthorized = false;

    if (authToken && authToken === process.env.AUTH_TOKEN) {
        isAuthorized = true;
        
        const response = NextResponse.next();
        response.cookies.set({
            name: TOKEN_PARAM_NAME,
            value: process.env.AUTH_TOKEN,
            path: '/',
        })
        return response
    }
}
