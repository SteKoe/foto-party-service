import React, {FormEvent, useState} from "react";
import {Field} from "@/components/form/Field";
import {InvitationGuestOption} from "@/prisma/generated/client";
import {Button} from "@nextui-org/react";
import {InvitationWithGuestChoice} from "@/prisma/types";
import {saveGuestChoices} from "@/app/actions/invitation";
import classNames from "classnames";
import style from "./GuestForm.module.css"

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
        saving: false,
        success: false,
        error: false
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

        setFormState(prevState => ({
            ...prevState,
            saving: true,
            success: false,
            error: false
        }));
        
        try {
            await saveGuestChoices({
                guest_id: invitation.Guest.guest_id,
                wedding_id: invitation.wedding_id,
                choices: state
            })

            setFormState(prevState => ({
                ...prevState,
                saving: false,
                success: true,
            }));
            
        } catch (e) {
            console.error(e);
            setFormState(prevState => ({
                ...prevState,
                saving: false,
                success: false,
                error: true
            }));
        }

        setTimeout(() => {
            setFormState(prevState => ({
                ...prevState,
                saving: false,
                success: false,
                error: false
            }));
        }, 2500);
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
                <Button color={formState.saving ? 'secondary' : formState.success ? 'success' : formState.error ? 'danger' : 'primary'}
                        radius="sm"
                        className={classNames('col-span-12', {
                            [style['success']]: formState.success
                        })}
                        disabled={formState.saving}
                        type="submit">
                    {formState.saving ? 'Wird gespeichert...' : formState.success ? 'Gespeichert!' : formState.error ? 'Das hat nicht geklappt, versuche es nochmal!' : 'Speichern'}
                </Button>
            </div>
        </form>
    );
}