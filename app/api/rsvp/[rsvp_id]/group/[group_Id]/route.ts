import {NextResponse} from "next/server";
import prisma from "@/app/prisma";

export async function GET(
    request: Request,
    {params}: { params: { rsvp_id: string, group_id: string } }
) {
    try {
        const result = await prisma.rsvpAttendee.findMany({
            where: {
                rsvp_id: params.rsvp_id,
                group_id: params.group_id
            },
            include: {
                choices: true
            }
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error(`Error reading RSVP attendee ${params.rsvp_id}:`, error);
        return NextResponse.json({error: "Nothing here"}, {status: 404});
    }
}
