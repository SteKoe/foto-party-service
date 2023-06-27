import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/pictures')) {
        const authToken = new URL(req.url).searchParams.get("token")

        if (authToken) {
            if (authToken === process.env.TAKE_PICTURE_TOKEN) {
                return NextResponse.next()
            }
        }

        const url = req.nextUrl
        url.pathname = '/'
        url.search = ''
        return NextResponse.redirect(url)
    }
}
