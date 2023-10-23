'use client';

import {BooleanField} from "@/components/form/BooleanField";
import {InvitationGuestOption} from "@/prisma/generated/client";
import {Textarea} from "@nextui-org/input";

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
        case 'text':
            return <Textarea
                label={props.option.name}
                color="secondary"
                className="col-span-12"
                value={props.value ?? ''}
                onValueChange={(value) => props.onChange({
                    ...props.option,
                    value: value.trim()
                })}
            ></Textarea>
    }
}