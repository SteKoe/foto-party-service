import {NextResponse} from "next/server";
import prisma from "@/app/prisma";
import {Rsvp} from "@prisma/client";

export async function GET(
    request: Request,
    {params}: { params: { rsvp_id: string } }
) {
    try {
        const rsvp: Rsvp = await prisma.rsvp.findUniqueOrThrow({
            where: {
                rsvp_id: params.rsvp_id
            },
        });

        return NextResponse.json(rsvp);
    } catch (error: any) {
        console.error(`Error reading RSVP ${params.rsvp_id}:`, error);
        return NextResponse.json({error: "Nothing here"}, {status: 404});
    }
}
