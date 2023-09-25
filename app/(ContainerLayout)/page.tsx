import Image from "next/image";
import React from "react";
import {HeroImage} from "@/components/HeroImage";

export default function Home() {
    const targetDate = new Date(process.env.MARRIAGE_DATE!)
    const now = new Date();
    const secondsDiff = targetDate.getTime() - now.getTime();
    const daysLeft = Math.floor(secondsDiff / (1000 * 3600 * 24));

    const title = <>{process.env.MARRIAGE_TITLE}</>;
    const subtitle = (
        <>
            <span dangerouslySetInnerHTML={{__html: process.env.MARRIAGE_SUBTITLE!}}/><br/>
            Noch {daysLeft} Tage!
        </>
    );


    return (
        <>
            <h1 className="heroHeading text-center">
                {title}
                <small>{subtitle}</small>
            </h1>
            <main className="px-4 py-8 md:p-12">
                <HeroImage />
            </main>
        </>
    )
}
