import React, {useState} from "react";
import {RsvpAttendee, RsvpAttendeeChoice, RsvpOption} from "@prisma/client";
import {Field} from "@/components/form/Field";

const findRsvpOptionById = (rsvpOptions: RsvpOption[], rsvpOptionId: string): RsvpOption => {
    return rsvpOptions.find((rev) => rev.rsvp_option_id === rsvpOptionId)!;
}

type AttendeeForm = {
    rsvpOptions: RsvpOption[],
    attendee: RsvpAttendee & {
        choices?: RsvpAttendeeChoice[]
    }
}

const convertType = (rsvpOption: RsvpOption, value: any) => {
    if (rsvpOption.type.toLowerCase() === 'boolean') {
        return convertToBoolean(value);
    }

    return value;
}

const convertToBoolean = (value: string | boolean | null) => {
    if (typeof value === 'boolean') {
        return value;
    }

    return value ? value?.toLowerCase() === 'true' : null;
}

export function AttendeeForm({rsvpOptions, attendee}: AttendeeForm) {
    const attendeeChoices = attendee.choices?.reduce((acc, curr) => {
            const rsvpOption = findRsvpOptionById(rsvpOptions, curr.rsvp_option_id);
            const convertedValue = convertType(rsvpOption, curr.value);

            return {...acc, [curr.rsvp_option_id]: convertedValue};
        }, {});

    const defaultState = rsvpOptions
        .map((rev) => ({
            [rev.rsvp_option_id]: null
        }))
        .reduce((acc, curr) => ({...acc, ...curr}), {});

    const [state, setState] = useState<{
        [key: string]: string | boolean | null
    }>({
        ...defaultState,
        ...attendeeChoices
    });
    
    const [isSaving, setIsSaving] = useState(false);
    const onChange = async (e: RsvpOption & {
        value: any
    }) => {
        const newState = {
            ...state,
            [e.rsvp_option_id]: e.value
        };
        setState(newState);

        const uri = `/api/rsvp/${rsvpOptions[0].rsvp_id}/attendee/${attendee.attendee_id}`;
        
        try {
            setIsSaving(true);
            await fetch(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newState),
            });            
        } catch (e) {
            
        } finally {
            setIsSaving(false);
        }
    }

    const fields = rsvpOptions.map((rev: RsvpOption) => {
        return (
            <Field key={rev.name} rsvpOption={rev} value={state[rev.rsvp_option_id]} onChange={onChange}/>
        )
    })

    return (
        <div className="grid grid-cols-12 gap-4 items-center">
            {isSaving && <div className="col-span-9 col-start-4">Saving...</div>}
            {fields}
        </div>
    );
}