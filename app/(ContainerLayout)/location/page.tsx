import React from "react";
import ContainerLayout from "@/app/ContainerLayout";
import {Metadata} from "next";
import Image from "next/image";
import logoPlanetarium from "./planetarium-white.svg";
import logoFranzFerdinand from "./logoFranzFerdinand.png";

export const metadata: Metadata = {
    title: 'Kim & Stephan | Wann & Wo',
}

export default function Page() {
    return (
        <ContainerLayout>
            <h1 className="heroHeading heading text-center">
                Was, wann, wo?<br/>
                <small><em>Unser Tag mit Euch!</em></small>
            </h1>
            <p className="initialLetter mb-12">
                Wenn wir schon beim Bogenschießen nichts treffen, hat Armors Pfeil zumindest uns erwischt!
                Unser Weg, der mit einem Marathon bei unserem ersten Date durch Köln begonnen hat,
                möchten wir für den Rest unseres Lebens fortgehen. Viele Reisen, eine Pandemie und vor allem Tanzbälle
                später, möchten wir nun den nächsten Schritt wagen und uns das Ja-Wort geben.
            </p>
            <div className="text-center mb-12">Wir heiraten! <br/>Und das möchten wir mit Euch feiern!</div>
            <p className="initialLetter mb-12">
                Die standesamtliche Trauung findet im Planetarium Bochum statt. "Hochzeit unter Sternen" ist das Motto
                unseres Tages!
                Nach der Trauung werden wir mit Euch ins Franz Ferdinand flanieren, wo wir uns im Rahmen einer freien
                Trauung das Ja-Wort geben.
                Anschließend wird gefeiert, getanzt und gelacht! Wir freuen uns auf Euch!
            </p>
            <div className="text-center mb-12">Dresscode: Tanzbar festlich!</div>

            <h2 className="heading text-4xl text-center">Locations</h2>

            <div className={"flex flex-col justify-center items-center gap-8 md:flex-row md:gap-12"}>
                <Image height={120}
                       className={"h-20 w-40 object-contain"}
                       alt={"dummy image"}
                       src={logoPlanetarium}/>
                <div className={"flex-1 p-0 m-0"}>
                    <h2 className="mb-4 text-2xl">Standesamtliche Trauung</h2>
                    <dl className="horizontal">
                        <dt className="font-bold">Wann</dt>
                        <dd>13:00 Uhr</dd>
                        <dt className="font-bold">Wo</dt>
                        <dd>Planetarium Bochum</dd>
                    </dl>
                </div>
            </div>

            <div className={"flex flex-col justify-center items-center mt-24 gap-8 md:flex-row md:gap-12"}>
                <Image
                    height={120}
                    className={"h-20 w-40 object-contain"}

                    alt={"dummy image"}
                    src={logoFranzFerdinand}/>
                <div className={"flex-1 p-0 m-0"}>
                    <div className={"flex-1 p-0 m-0"}>
                        <h2 className="mb-4 text-2xl">Location & Freie Trauung</h2>
                        <dl className="horizontal">
                            <dt className="font-bold">Wann</dt>
                            <dd>16:00 Uhr</dd>
                            <dt className="font-bold">Wo</dt>
                            <dd>Franz Ferdinand<br/>Klinikstraße 51, 44791 Bochum</dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="mb-24"></div>
        </ContainerLayout>
    )
}