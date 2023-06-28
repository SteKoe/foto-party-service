import {NextRequest, NextResponse} from "next/server";

const TOKEN_PARAM_NAME = 'token';

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get(TOKEN_PARAM_NAME)
    const authToken = new URL(request.url).searchParams.get(TOKEN_PARAM_NAME) || cookie?.value;

    if (authToken) {
        if (authToken === process.env.AUTH_TOKEN) {
            const response = NextResponse.next();
            response.cookies.set({
                name: TOKEN_PARAM_NAME,
                value: process.env.AUTH_TOKEN,
                path: '/',
            })
            return response
        }
    }

    const url = request.nextUrl
    url.pathname = '/'
    url.search = ''
    let nextResponse = NextResponse.redirect(url);
    nextResponse.cookies.delete(TOKEN_PARAM_NAME);
    return nextResponse
}

export const config = {
    matcher: [
        "/pictures",
        "/pictures/gallery",
        "/pictures/take",
    ]
}