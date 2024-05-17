import { NextRequest, NextResponse } from 'next/server';
import { decryptToken, ROLES } from '@/utils/crypto';

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
    '/pictures/gallery',
    '/api/pictures',
];

const forbiddenPathsOnServer = ['/qrcodes'];

export async function checkIsAuthorized(
    pathname: string,
    authToken: string | undefined,
) {
    try {
        const decryptedToken = await decryptToken(authToken ?? '');

        if (pathname.startsWith('/pictures/gallery')) {
            return decryptedToken?.roles?.includes(ROLES.SHOW_PICTURES);
        }

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

    const isAuthorized = await checkIsAuthorized(pathname, authToken);
    const token = await decryptToken(authToken!);
    console.log(token);
    if (isAuthorized) {
        const tokenParam = request.nextUrl.searchParams.has(TOKEN_PARAM_NAME);
        if (tokenParam) {
            const url = request.nextUrl;
            url.searchParams.delete(TOKEN_PARAM_NAME);

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
