import {NextResponse} from "next/server";
import {deleteFile, getFile} from "@/app/api/GoogleDriveClient";

export async function GET(
    request: Request,
    {params}: { params: { name: string } }
) {
    try {
        const reader = await getFile(params.name);
        return new NextResponse(reader);
    } catch (e) {
        return NextResponse.json({error: 404}, {status: 404});
    }
}

export async function DELETE(request: Request, {params}: { params: { name: string } }) {
    try {
        const status = await deleteFile(params.name);
        return new NextResponse(null, {status: status});
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: 404}, {status: 404});
    }
}
