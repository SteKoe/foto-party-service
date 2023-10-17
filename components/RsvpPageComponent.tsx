'use client';

import React from "react";
import {Rsvp, RsvpAttendee, RsvpOption} from "@prisma/client";
import {AttendeeForm} from "@/components/AttendeeForm";

type Props = {
    rsvp: Rsvp,
    rsvpOptions: RsvpOption[],
    attendees: RsvpAttendee[]
}

export function RsvpPageComponent({rsvp, rsvpOptions, attendees}: Props) {
    const attendeeForms = attendees.map((attendee: RsvpAttendee) => {
        return (
            <form key={attendee.attendee_id} >
                <h3>{attendee.name}</h3>
                <AttendeeForm attendee={attendee} rsvpOptions={rsvpOptions}/>
            </form>
        )
    });

    return (
        <>
            <section>
                Hallo {readableNum(attendees)}!
            </section>
            {attendeeForms}
        </>
    )
}

function readableNum(rsvpAttendees: RsvpAttendee[]): string {
    switch (rsvpAttendees.length) {
        case 2:
            return `ihr beiden`;
        default:
            return rsvpAttendees[0].name;
    }
}


