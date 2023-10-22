'use client';

import {BooleanField} from "@/components/form/BooleanField";
import {InvitationGuestOption} from "@/prisma/generated/client";

type FieldProps = {
    option: InvitationGuestOption,
    guestId: string,
    value: any,
    onChange: (e: InvitationGuestOption & { value: any }) => void
}

export function Field(props: FieldProps) {
    switch (props.option.type) {
        case 'boolean':
            return <BooleanField guestId={props.guestId}
                                 fieldDefinition={props.option}
                                 value={props.value}
                                 onChange={props.onChange}
            />
    }
}