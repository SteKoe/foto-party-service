'use client';

import {TimelineEntry} from "@/components/TimelineEntry";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBabyCarriage, faHeart} from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";
import {useEffect} from "react";
import styles from "./TimelineEntry.module.css";

const timelineEntries = [
    {
        datum: "15.03.2019",
        bild: "/img/timeline/2019-laufen.jpg",
        beschreibung: "Priaten joho!"
    },
    {
        datum: "06.04.2019",
        bild: "/img/timeline/2019-ball.jpg",
        beschreibung: "Let's Dance! Erster gemeinsamer Tanzball!"
    },
    {
        datum: "August 2019",
        bild: "/img/timeline/2019-tuerkei.jpg",
        beschreibung: "Unser erster gemeinsamer Urlaub. In Dalyan!"
    },
    {
        datum: "Oktboer 2019",
        bild: "/img/timeline/2019-paris.jpg",
        beschreibung: "Urlaub in Paris!"
    },
    {
        datum: "Silvester 2019",
        bild: "/img/timeline/2019-silvester.jpg",
        beschreibung: "Pärchenurlaub ins neue Jahr!"
    },
    {
        datum: "Juli 2021",
        bild: "/img/timeline/2021-sueddeutschland.jpg",
        beschreibung: "Partner in Crime! Roadtrip durch trotz des Virus!"
    },
    {
        datum: "September 2021",
        bild: "/img/timeline/2021-goettingen.jpg",
        beschreibung: "Ciao Göttingen, es war schön!"
    },
    {
        datum: "21.10.2021",
        bild: "/img/timeline/2021-katze-oktober.jpg",
        beschreibung: "Wir haben Nachwuchs! Es ist... eine Katze!"
    },
    {
        datum: "26.05.2022",
        bild: "/img/timeline/2022-katze-oxford.jpg",
        beschreibung: "Hurra! Es ist ein Kater!"
    },
    {
        datum: "August 2022",
        bild: "/img/timeline/2022-frankreich.jpg",
        beschreibung: "Fronkreisch! Normandie! Ola-la!"
    },
    {
        icon: <FontAwesomeIcon icon={faHeart} className="text-white p-1.5"/>,
        datum: "01.06.2023",
        bild: "/img/timeline/2023-verlobung.jpg",
        beschreibung: "Verlobung"
    },
    {
        icon: <Image alt={""} width={64} height={64} src={"/img/ring.png"} className="text-white p-1"/>,
        datum: "31.05.2025",
        beschreibung: "Well... :)"
    }
];


export default function Timeline() {
    useEffect(() => {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles['is-visible'])
                }
            });
        }, {
            threshold: .1,
        });

        document.querySelectorAll('.timeline-entry').forEach((section) => {
            observer.observe(section);
        });
    }, []);

    return (
        <div className=" flex flex-col justify-center timeline">
            <div className="py-3 sm:max-w-xl sm:mx-auto w-full px-2 sm:px-0">
                <div className={"relative h-36 translate-x-2"}>
                    <Image width={96} height={96} src={"/img/der-stephan.jpg"} alt={""}
                           className={"rounded-full absolute right-1/2 border-2"}/>
                    <Image width={96} height={96} src={"/img/die-kim.jpg"} alt={""}
                           className={"rounded-full absolute left-1/2 -translate-x-4 border-2"}/>
                </div>
                <div className="relative text-gray-700 antialiased text-sm font-semibold">
                    <div
                        className="hidden sm:block w-0.5 bg-white/20 backdrop-blur absolute h-full left-1/2 transform -translate-x-1/2"></div>

                    {timelineEntries.map((te, idx) => (
                        <TimelineEntry datum={te.datum}
                                       position={idx % 2 === 0 ? 'left' : 'right'}
                                        icon={te.icon ?? null}>
                            {te.bild ? (<Image alt={""} width={350} height={350} src={te.bild}
                                                className={"w-full aspect-square object-cover object-top"}/>) : ''}
                            <div className={"px-4 pt-4"}>
                                {te.beschreibung}
                            </div>
                        </TimelineEntry>
                    ))}
                </div>
            </div>
        </div>
    )
}