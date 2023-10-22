import {NextResponse} from "next/server";
import prisma from "@/app/prisma";

export async function POST(
    request: Request,
    {params}: { params: { wedding_id: string, guest_id: string } }
) {
    try {
        const payload = await request.json();
        for (const [option_id, value] of Object.entries(payload)) {
            await prisma.guestChoice.upsert({
                where: {
                    invitation_id_option_id_guest_id: {
                        invitation_id: params.wedding_id,
                        option_id: option_id,
                        guest_id: params.guest_id
                    },
                },
                update: {
                    value: String(value)
                },
                create: {
                    invitation_id: params.wedding_id,
                    option_id: option_id,
                    guest_id: params.guest_id,
                    value: String(value),
                }
            })
            
        }
        return NextResponse.json({});
        
    } catch (error: any) {
        console.error(`Error reading RSVP attendee ${params.wedding_id}:`, error);
        return NextResponse.json({error: "Nothing here"}, {status: 404});
    }
}
