import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {TimelineEvent} from "@/app/(ContainerLayout)/story/TimelineEvent";

export const events_coupled: TimelineEvent[] = [
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
]