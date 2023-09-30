import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {TimelineEvent} from "@/app/(ContainerLayout)/story/TimelineEvent";

export const events_coupled: TimelineEvent[] = [
    {
        datum: "16.01.2019",
        bild: "/img/timeline/2019-erstes-date.jpg",
        beschreibung: "Köln. Erstes Date. 14 Stunden. 41.537 Schritte.",
        position: 'center'
    },
    {
        datum: "01.02.2019",
        beschreibung: "Wir sind ein Paar!",
    },
    {
        datum: "10.02.2019",
        movie: "/img/timeline/20190210-konfetti.mp4",
        beschreibung: "Es soll Konfetti für uns regnen!",
    },
    {
        datum: "24.02.2019",
        bild: "/img/timeline/20190224-golden-gate.jpg",
        beschreibung: "San Francisco. Golden Gate Bridge. 10.000 km entfernt. 9 Stunden Zeitverschiebung.",
    },
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
        datum: "August 2020",
        bild: "/img/timeline/2020-leipzig-kollage.jpg",
        beschreibung: "Bekloppt in Leipzig! Wir sind speziell. Und viele!",
        position: "center"
    },
    {
        datum: "Juli 2021",
        bild: "/img/timeline/2021-sueddeutschland.jpg",
        beschreibung: "Partner in Crime! Roadtrip trotz des Virus!"
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
        beschreibung: "Wir haben JA! gesagt!"
    },
    {
        datum: "26.08.2023",
        movie: "/img/timeline/2023-ball.mp4",
        beschreibung: ""
    },
    {
        icon: <Image alt={""} width={64} height={64} src={"/img/ring.png"} className="text-white p-1"/>,
        datum: "30.08.2024",
        beschreibung: "Well... :)"
    }
]