import {NextResponse} from "next/server";
import prisma from "@/app/prisma";
import {Invitation} from ".prisma/client";

export async function GET(
    request: Request,
    {params}: { params: { invitation_id: string } }
) {
    try {
        const rsvp: Invitation = await prisma.invitation.findUniqueOrThrow({
            where: {
                invitation_id: params.invitation_id
            },
        });

        return NextResponse.json(rsvp);
    } catch (error: any) {
        console.error(`Error reading RSVP ${params.invitation_id}:`, error);
        return NextResponse.json({error: "Nothing here"}, {status: 404});
    }
}
