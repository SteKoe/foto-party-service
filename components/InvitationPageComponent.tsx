'use client';

import React from "react";
import {GuestForm} from "@/components/GuestForm";
import {InvitationGuestOption, Wedding, WeddingGuest} from "@/prisma/generated/client";
import {InvitationWithGuestChoice} from "@/prisma/types";

type Props = {
    invitations: InvitationWithGuestChoice[],
    wedding: Wedding & {
        InvitationGuestOption: InvitationGuestOption[]
    }
}


export function InvitationPageComponent({invitations, wedding}: Props) {
    const guests: WeddingGuest[] = invitations.flatMap(invitation => invitation.Guest)

    const attendeeForms = guests.map((guest: WeddingGuest) => {
        return (
            <form key={guest.guest_id}>
                <h3>{guest.name}</h3>
                <GuestForm guest={guest} invitationOption={wedding.InvitationGuestOption}/>
            </form>
        )
    });

    return (
        <>
            <section>
                Hallo {readableNum(guests)}!
            </section>
            {attendeeForms}
        </>
    )
}

function readableNum(guests: WeddingGuest[]): string {
    switch (guests.length) {
        case 2:
            return `ihr beiden`;
        case 3:
            return `ihr drei`;
        case 4:
            return `ihr vier`;
        default:
            return guests[0].name;
    }
}


