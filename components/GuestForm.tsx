import React, {useState} from "react";
import {Field} from "@/components/form/Field";
import {GuestChoice, InvitationGuestOption, WeddingGuest} from "@/prisma/generated/client";

const convertType = (rsvpOption: InvitationGuestOption, value: any) => {
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

type AttendeeForm = {
    invitationOption: InvitationGuestOption[],
    guest: WeddingGuest & {
        GuestChoice?: GuestChoice[]
    }
}

export function GuestForm({invitationOption, guest}: AttendeeForm) {
    const initialState = invitationOption
        .map((rev) => ({
            [rev.option_id]: null
        }))
        .reduce((acc, curr) => ({...acc, ...curr}), {});

    const guestChoices = guest.GuestChoice?.reduce((acc: any, curr: any) => {
        const rsvpOption = invitationOption.find((rev) => rev.option_id === curr.option_id)!;
        const convertedValue = convertType(rsvpOption, curr.value);

        return {...acc, [curr.option_id]: convertedValue};
    }, {});

    const [state, setState] = useState<{
        [key: string]: string | boolean | null
    }>({
        ...initialState,
        ...guestChoices
    });

    const [isSaving, setIsSaving] = useState(false);
    const onChange = async (e: InvitationGuestOption & {
        value: any
    }) => {
        const newState = {
            ...state,
            [e.option_id]: e.value
        };
        setState(newState);

        const uri = `/api/wedding/${invitationOption[0].wedding_id}/guest/${guest.guest_id}`;

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

    const fields = invitationOption.map((option) => {
        return (
            <Field key={option.name} option={option} value={state[option.option_id]} onChange={onChange}/>
        )
    })

    return (
        <>
            <div className="grid grid-cols-12 gap-4 items-center">
                {isSaving && <div className="col-span-9 col-start-4">Saving...</div>}
                {fields}
            </div>
        </>
    );
}