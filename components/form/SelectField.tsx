'use client';

import {RsvpOption} from "@prisma/client";
import {z} from "zod";
import {makeid} from "@/utils/makeId";

type Props = {
    definition: RsvpOption,
    value: string,
    onChange: (e: RsvpOption & {
        value: string | null
    }) => void
}

const SelectFieldDefinitionSchema = z.object({
    values: z.array(z.object({
        value: z.string(),
        label: z.string(),
    })),
})

export function SelectField({definition, onChange, value}: Props) {
    const config = SelectFieldDefinitionSchema.parse(definition.config);
    const id = `${definition.rsvp_option_id}-${makeid()}}`;

    return (
        <>
            <label htmlFor={id} className="col-span-3 block font-semibold text-gray-900 dark:text-white">
                {definition.name}
            </label>
            <select id={id}
                    value={value ?? ''}
                    onChange={(e) => onChange({...definition, value: e.target.value === '' ? null : e.target.value})}
                    className="col-span-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option defaultChecked={true} value={''}>Bitte auswählen</option>
                {config.values.map((option) => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </>
    )
}