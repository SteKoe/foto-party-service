import React from 'react';
import { HeroImage } from '@/components/HeroImage';
import { DateTime, Interval } from 'luxon';

function calculateDaysLeft() {
    let daysLeft = 0;
    try {
        const interval = Interval.fromDateTimes(
            DateTime.now(),
            DateTime.fromISO(process.env.MARRIAGE_DATE!),
        );
        daysLeft = Math.floor(interval.toDuration().as('days'));
    } catch (e) {
        console.error('Error while calculating days left', e);
    }
    return daysLeft;
}

export default async function Home() {
    const daysLeft = calculateDaysLeft();
    const title = <>{process.env.MARRIAGE_TITLE}</>;
    const subtitle = (
        <>
            <span
                dangerouslySetInnerHTML={{
                    __html: process.env.MARRIAGE_SUBTITLE!,
                }}
            />
            {daysLeft > 0 ? (
                <>
                    <br />
                    Noch {daysLeft} Tage!
                </>
            ) : (
                ''
            )}
        </>
    );

    return (
        <>
            <h1 className="heroHeading text-center">
                <small>
                    <em>Hochzeit unter Sternen</em>
                </small>
                {title}
                <small className="mt-8 md:mt-12">{subtitle}</small>
            </h1>
            <main className="px-4 py-8 md:p-12">
                <HeroImage />
            </main>
        </>
    );
}
