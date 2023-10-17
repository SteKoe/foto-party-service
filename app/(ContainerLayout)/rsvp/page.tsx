import React from "react";
import ContainerLayout from "@/app/ContainerLayout";
import {Metadata} from "next";
import prisma from "@/app/prisma";
import {RsvpPageComponent} from "@/components/RsvpPageComponent";
import {cookies} from "next/headers";
import {TOKEN_PARAM_NAME} from "@/middleware";
import {decryptToken} from "@/utils/crypto";

export const metadata: Metadata = {
    title: 'Kim & Stephan | RSVP',
}

export default async function Page() {
    const tokenFromCookie = cookies().get(TOKEN_PARAM_NAME)?.value;
    const token = await decryptToken(tokenFromCookie ?? '');
    console.log(token);
    if (!token?.rsvpGroupId) {
        return <>{}</>
    }

    const attendees = await prisma.rsvpAttendee.findMany({
        where: {
            group_id: token.rsvpGroupId
        },
        include: {
            choices: true,
            rsvp: true
        }
    });

    if (attendees.length === 0) {
        return <></>
    }

    const rsvpId = attendees[0].rsvp_id;
    const rsvpOptions = await prisma.rsvpOption.findMany({
        where: {
            rsvp_id: rsvpId,
        },
        orderBy: {
            order: 'asc'
        }
    })

    return (
        <ContainerLayout>
            <RsvpPageComponent rsvp={attendees[0].rsvp} rsvpOptions={rsvpOptions} attendees={attendees}/>
        </ContainerLayout>
    )
}   