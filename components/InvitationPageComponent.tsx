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


    return (
        <>
            <h1>Hallo {readableNum(guests)}!</h1>
            <p>
                {getDescription(guests.length > 1)}
            </p>
            {invitations.map((invitation: InvitationWithGuestChoice) => {
                return (
                    <div key={invitation.Guest.guest_id}>
                        <div>
                            <h3>{invitation.Guest.name}</h3>
                            <GuestForm invitation={invitation}
                                       invitationOption={wedding.InvitationGuestOption}/>
                        </div>
                    </div>
                )
            })}
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

function getDescription(plural: boolean) {
    if (plural) {
        return (<>
            Schön, dass ihr hier seid. Bitte füllt das Formular aus, damit wir wissen,
            ob ihr kommt und was ihr essen möchtet. Ohne zu viel verraten zu wollen: es gibt natürlich ein Buffet,
            die Vorspeise aber wird am Platz serviert. Daher möchten gerne wissen, welche Präferenzen wir
            berücksichtigen dürfen.
        </>)
    }

    return (
        <>
            Schön, dass du da bist. Bitte fülle das Formular aus, damit wir wissen,
            ob du kommst und was du essen magst. Ohne zu viel verraten zu wollen: es gibt natürlich ein Buffet,
            die Vorspeise aber wird am Platz serviert. Daher möchten gerne wissen, welche Präferenzen wir
            berücksichtigen dürfen.
        </>
    )
}

