import React, {FormEvent, useState} from "react";
import {Field} from "@/components/form/Field";
import {InvitationGuestOption} from "@/prisma/generated/client";
import {Button} from "@nextui-org/react";
import {InvitationWithGuestChoice} from "@/prisma/types";
import {saveGuestChoices} from "@/app/actions/invitation";

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
    invitation: InvitationWithGuestChoice
}

export function GuestForm({invitationOption, invitation}: AttendeeForm) {
    const [formState, setFormState] = useState({
        saving: false
    })
    
    const initialState = invitationOption
        .map((rev) => ({
            [rev.option_id]: null
        }))
        .reduce((acc, curr) => ({...acc, ...curr}), {});

    const guestChoices = invitation.Guest.GuestChoice?.reduce((acc: any, curr: any) => {
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

    const onChange = async (e: InvitationGuestOption & {
        value: any
    }) => {
        const newState = {
            ...state,
            [e.option_id]: e.value
        };
        setState(newState);
    }

    const handleSubmit = async (e: FormEvent<any>) => {
        e.preventDefault();

        setFormState({
            saving: true
        })
        try {
            await saveGuestChoices({
                guest_id: invitation.Guest.guest_id,
                wedding_id: invitation.wedding_id,
                choices: state
            })
        } catch (e) {
            console.error(e);
        } finally {
            setFormState({
                saving: false
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4 items-center">
                {invitationOption.map((option) => {
                    return (
                        <Field key={option.name}
                               guestId={invitation.Guest.guest_id}
                               option={option}
                               value={state[option.option_id]}
                               onChange={onChange}
                        />
                    )
                })}
            </div>
            <div className="grid grid-cols-12 mt-4">
                <Button color={formState.saving ? 'secondary' : 'primary'}
                        radius="sm"
                        className="col-start-4 col-span-9"
                        disabled={formState.saving}
                        type="submit">
                    {formState.saving ? 'Wird gespeichert...' : 'Speichern'}
                </Button>
            </div>
        </form>
    );
}