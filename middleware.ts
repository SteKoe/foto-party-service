import {NextRequest, NextResponse} from "next/server";

export const TOKEN_PARAM_NAME = 'token';

export function readToken(request: NextRequest) {
    const cookie = request.cookies.get(TOKEN_PARAM_NAME)
    return request.nextUrl.searchParams.get(TOKEN_PARAM_NAME) || cookie?.value;
}

const authorizedPaths = [
    '/story',
    '/location',
    '/pictures',
    '/pictures/take',
    '/pictures/gallery',
    '/api/pictures',
    '/api/pictures/upload',
];

export function checkIsAuthorized(authToken: string | undefined) {
    return authToken && authToken === process.env.AUTH_TOKEN;
}

export function middleware(request: NextRequest) {
    const authToken = readToken(request);

    if (checkIsAuthorized(authToken)) {
        if (request.nextUrl.searchParams.has(TOKEN_PARAM_NAME)) {
            const url = request.nextUrl;
            url.searchParams.delete(TOKEN_PARAM_NAME);

            const response = NextResponse.redirect(url);
            const maxAge = Number(process.env.AUTH_TOKEN_SECONDS ?? 60 * 60 * 24);

            response.cookies.set({
                name: TOKEN_PARAM_NAME,
                value: process.env.AUTH_TOKEN!,
                path: '/',
                maxAge
            })
            return response
        }

        return NextResponse.next()
    }

    const pathname = new URL(request.url).pathname;
    const requiresAuthentication = authorizedPaths.includes(pathname);
    if (requiresAuthentication) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}
