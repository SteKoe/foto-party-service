'use client';

import classNames from "classnames";
import {z} from "zod";
import {InvitationGuestOption} from "@/prisma/generated/client";

type Props = {
    guestId: string,
    fieldDefinition: InvitationGuestOption,
    value: boolean,
    onChange: (e: InvitationGuestOption & {
        value: boolean
    }) => void
}

const ValueSchema = z.boolean().nullable()


type InternalFieldDefinitionType = InvitationGuestOption & {
    config: {
        values: { value: boolean, label: string }[]
    }
};

export function BooleanField({fieldDefinition, value, guestId, onChange}: Props) {
    const internalValue = ValueSchema.parse(value);

    const internalFieldDefinition = {
        ...fieldDefinition,
        config: {
            values: [
                {value: true, label: "Ja"},
                {value: false, label: "Nein"},
            ],
        }
    } as InternalFieldDefinitionType;
    
    return (
        <>
            <label className="col-span-12 md:col-span-3 font-semibold text-white">{fieldDefinition.name}</label>
            <ul className="col-span-12 md:col-span-9 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {internalFieldDefinition.config.values.map((value, index) => {
                    const name = `option_${guestId}_${value.value}.${fieldDefinition.option_id}`;
                    return <OptionItem key={name}
                                       name={name}
                                       fieldDefinition={internalFieldDefinition}
                                       option={value}
                                       index={index}
                                       onChange={(value) => onChange({...fieldDefinition, value})}
                                       checked={value.value === internalValue} />
                })}
            </ul>
        </>
    )
}

type OptionItemProps = {
    index: number,
    name: string,
    fieldDefinition: InternalFieldDefinitionType,
    checked: boolean,
    option: {
        value: boolean,
        label: string
    },
    onChange: (value: boolean) => void
}

function OptionItem({index, name, option, fieldDefinition, checked, onChange}: OptionItemProps) {

    const className = classNames(
        {'w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600': (index !== fieldDefinition.config.values?.length - 1)},
        'w-full dark:border-gray-600'
    )

    const id = `${name}-${option.value}`;
    return (
        <li className={className}>
            <div className="flex items-center pl-3">
                <input id={id}
                       type="radio"
                       name={name}
                       value={option.value.toString()}
                       checked={checked}
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                       onChange={() => onChange(option.value)}
                />
                <label htmlFor={id}
                       className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {option.label}
                </label>
            </div>
        </li>
    )
}