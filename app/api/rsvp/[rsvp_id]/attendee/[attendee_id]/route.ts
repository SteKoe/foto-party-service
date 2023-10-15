import {NextResponse} from "next/server";
import prisma from "@/app/prisma";

export async function GET(
    request: Request,
    {params}: { params: { rsvp_id: string, attendee_id: string } }
) {
    try {
        const rsvp = await prisma.rsvpAttendee.findUniqueOrThrow({
            where: {
                rsvp_id: params.rsvp_id,
                attendee_id: params.attendee_id
            }
        });

        return NextResponse.json(rsvp);
    } catch (error: any) {
        console.error(`Error reading RSVP attendee ${params.rsvp_id}:`, error);
        return NextResponse.json({error: "Nothing here"}, {status: 404});
    }
}

export async function POST(
    request: Request,
    {params}: { params: { rsvp_id: string, attendee_id: string } }
) {
    try {
        const payload = await request.json();
        for (const [rsvp_option_id, value] of Object.entries(payload)) {
            await prisma.rsvpAttendeeChoice.upsert({
                where: {
                    rsvp_id_rsvp_option_id_attendee_id: {
                        rsvp_id: params.rsvp_id,
                        rsvp_option_id: rsvp_option_id,
                        attendee_id: params.attendee_id
                    },
                },
                update: {
                    value: String(value)
                },
                create: {
                    rsvp_id: params.rsvp_id,
                    rsvp_option_id: rsvp_option_id,
                    attendee_id: params.attendee_id,
                    value: String(value),
                }
            })
            
        }
        return NextResponse.json({});
        
    } catch (error: any) {
        console.error(`Error reading RSVP attendee ${params.rsvp_id}:`, error);
        return NextResponse.json({error: "Nothing here"}, {status: 404});
    }
}
