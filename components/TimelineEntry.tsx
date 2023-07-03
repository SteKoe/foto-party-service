import {PropsWithChildren, ReactNode} from "react";

type TimelineEntryProps = {
    position?: 'left' | 'right',
    datum: string,
    icon?: ReactNode | undefined
} & PropsWithChildren
export function TimelineEntry({position = 'left', icon, children, datum}: TimelineEntryProps) {
    return (
        <div className="mt-6 sm:mt-0 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center">
                <div className={`flex w-full mx-auto items-center ${position === 'left' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-full sm:w-1/2 ${position === 'left' ? 'sm:pr-8' : 'sm:pl-8'}`}>
                        <div className="overflow-hidden bg-white rounded shadow relative">
                            {children}
                            {datum ? (<div className="px-4 pb-4"><strong><em>{datum}</em></strong></div>) : ''}
                        </div>
                    </div>
                </div>
                <div
                    className="rounded-full bg-blue-500 border-white border-2 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                    {icon}
                </div>
            </div>
        </div>
    );
}