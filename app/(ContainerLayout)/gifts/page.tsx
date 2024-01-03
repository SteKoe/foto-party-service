import ContainerLayout from '@/app/ContainerLayout';
import React from 'react';

export default function Page() {
    return (
        <ContainerLayout>
            <h1 className="heroHeading heading text-center">Geschenke?</h1>
            <p className="text-left italic first-letter:text-4xl sm:text-center md:m-auto md:w-80">
                Wenn Ihr zu unserer Hochzeit kommt, ist es unser schönstes
                Geschenk! Wenn ihr dennoch nicht davon abzubringen seid, uns
                etwas zu schenken, dann würden wir uns über einen Zuschuss zu
                unserer Reisekasse freuen!
            </p>
        </ContainerLayout>
    );
}
