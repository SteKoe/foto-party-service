import React from "react";
import ContainerLayout from "@/app/ContainerLayout";
import {Metadata} from "next";
import prisma from "@/app/prisma";
import {RsvpPageComponent} from "@/components/RsvpPageComponent";
import {encrypt} from "@/utils/crypto";

export const metadata: Metadata = {
    title: 'Kim & Stephan | RSVP',
}

export default async function Page({params}: { params: { group_id: string } }) {
    if (!params.group_id) {
        return <></>
    }

    console.log(encrypt(JSON.stringify({
        group_id: params.group_id
    })));
    
    const attendees = await prisma.rsvpAttendee.findMany({
        where: {
            group_id: params.group_id
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