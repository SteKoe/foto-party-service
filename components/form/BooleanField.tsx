'use client';

import {RsvpOption} from "@prisma/client";
import classNames from "classnames";
import {z} from "zod";
import {makeid} from "@/utils/makeId";

type Props = {
    rsvpOption: RsvpOption,
    value: boolean,
    onChange: (e: RsvpOption & {
        value: boolean
    }) => void
}

const ValueSchema = z.boolean().nullable()

export function BooleanField({rsvpOption, onChange, value}: Props) {
    const internalValue = ValueSchema.parse(value);

    const internalDefinition = {
        ...rsvpOption,
        config: {
            values: [
                {value: true, label: "Ja"},
                {value: false, label: "Nein"},
            ],
        }
    }

    const onChangeInternal = (e?: boolean) => {
        onChange({...rsvpOption, value: e === true})
    }

    return (
        <>
            <label className="col-span-12 md:col-span-3 font-semibold text-gray-900 dark:text-white">{rsvpOption.name}</label>
            <ul className="col-span-12 md:col-span-9 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {internalDefinition.config.values.map((option, index) => {
                    return <OptionItem key={`${rsvpOption.rsvp_option_id}-${index}`}
                                       index={index}
                                       definition={internalDefinition}
                                       option={option}
                                       checked={option.value === internalValue}
                                       onChange={onChangeInternal}/>
                })}
            </ul>
        </>
    )
}

type OptionItemProps = {
    index: number,
    definition: RsvpOption & {
        config: {
            values: any[]
        }
    },
    checked: boolean,
    option: {
        value: boolean,
        label: string
    },
    onChange: (value: boolean) => void
}

function OptionItem({index, option, definition, onChange, checked}: OptionItemProps) {
    const id = `${definition.rsvp_option_id}-${makeid()}-${index}`;

    const className = classNames(
        {'w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600': (index !== definition.config.values?.length - 1)},
        'w-full dark:border-gray-600'
    )

    return (
        <li className={className}>
            <div className="flex items-center pl-3">
                <input id={id} type="radio" value="" name={id}
                       checked={checked}
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                       onChange={() => onChange(option.value)}/>
                <label htmlFor={id}
                       className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{option.label}</label>
            </div>
        </li>
    )
}