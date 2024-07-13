import React, { PropsWithoutRef } from 'react';

type Props = {
    className?: string;
};

export const NoIcon = (props: PropsWithoutRef<Props>) => (
    <svg
        aria-hidden="true"
        height=".5em"
        width=".5em"
        viewBox="0 0 60.26 47"
        focusable="false"
        role="presentation"
        {...props}
    >
        <path
            d="m19.59,31.11c9.38-9.4,17.83-17.86,26.28-26.33.88-.89,1.73-1.82,2.66-2.65,3.15-2.8,7.03-2.84,9.72-.14,2.68,2.69,2.74,6.67-.19,9.71-5.12,5.31-10.4,10.46-15.62,15.67-5.51,5.51-10.99,11.05-16.54,16.53-4.15,4.1-7.43,4.13-11.52.11-3.98-3.9-7.92-7.83-11.79-11.82-3.3-3.4-3.43-7.52-.49-10.3,2.83-2.67,6.67-2.41,10.01.73,1.32,1.24,2.64,2.49,3.83,3.84,1.19,1.35,2.23,2.83,3.64,4.65Z"
            fill="currentColor"
        />
    </svg>
);
