import {NextRequest, NextResponse} from "next/server";

const TOKEN_PARAM_NAME = 'token';

export function readToken(request: NextRequest) {
    const cookie = request.cookies.get(TOKEN_PARAM_NAME)
    return new URL(request.url).searchParams.get(TOKEN_PARAM_NAME) || cookie?.value;
}

const authorizedPaths = [
    '/story',
    '/pictures',
    '/pictures/take',
    '/pictures/gallery',
    '/api/pictures',
    '/api/pictures/upload',
];

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

    const pathname = new URL(request.url).pathname;
    const requiresAuthentication = authorizedPaths.includes(pathname);
    if (requiresAuthentication) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}
