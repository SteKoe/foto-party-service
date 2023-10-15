'use client';

import {BooleanField} from "@/components/form/BooleanField";
import {RsvpOption} from "@prisma/client";
import {SelectField} from "@/components/form/SelectField";

type FieldProps = {
    rsvpOption: RsvpOption,
    value: any,
    onChange: (e: RsvpOption & { value: any }) => void
}

export function Field(props: FieldProps) {
    switch (props.rsvpOption.type) {
        case 'boolean':
            return <BooleanField rsvpOption={props.rsvpOption} value={props.value} onChange={props.onChange}/>
        case 'select':
            return <SelectField definition={props.rsvpOption} value={props.value} onChange={props.onChange}/>
    }
}