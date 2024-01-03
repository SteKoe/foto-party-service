import { NextRequest, NextResponse } from 'next/server';
import { decryptToken } from '@/utils/crypto';

export const TOKEN_PARAM_NAME = 'token';

export function readToken(request: NextRequest) {
    const cookie = request.cookies.get(TOKEN_PARAM_NAME);
    return request.nextUrl.searchParams.get(TOKEN_PARAM_NAME) || cookie?.value;
}

const authorizedPaths = [
    '/invitation',
    '/story',
    '/gifts',
    '/location',
    '/pictures',
    '/pictures/take',
    '/pictures/gallery',
    '/api/pictures',
    '/api/pictures/upload',
];

const forbiddenPathsOnServer = ['/qrcodes'];

export async function checkIsAuthorized(authToken: string | undefined) {
    try {
        const decryptedToken = await decryptToken(authToken ?? '');
        return decryptedToken !== null;
    } catch (e) {
        console.log('Error check authentication', e);
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const pathname = new URL(request.url).pathname;

    if (process.env.VERCEL && forbiddenPathsOnServer.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const authToken = readToken(request);

    const isAuthorized = await checkIsAuthorized(authToken);
    if (isAuthorized) {
        if (request.nextUrl.searchParams.has(TOKEN_PARAM_NAME)) {
            const url = request.nextUrl;
            url.searchParams.delete(TOKEN_PARAM_NAME);

            const token = await decryptToken(authToken!);
            if (token?.invitationKey && Object.keys(token).length === 1) {
                url.pathname = '/invitation';
            }

            const response = NextResponse.redirect(url);
            const maxAge = Number(
                process.env.AUTH_TOKEN_SECONDS ?? 60 * 60 * 24,
            );

            response.cookies.set({
                name: TOKEN_PARAM_NAME,
                value: authToken!,
                path: '/',
                maxAge,
            });
            return response;
        }

        return NextResponse.next();
    }

    const requiresAuthentication = authorizedPaths.includes(pathname);
    if (requiresAuthentication) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}
