'use client';

import {TimelineEntry} from "@/components/TimelineEntry";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBabyCarriage, faHeart} from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";
import {useEffect} from "react";
import styles from "./TimelineEntry.module.css";

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

                    <TimelineEntry datum={"15.03.2019"}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2019-laufen.jpg"
                               className={"w-full aspect-square object-cover object-top mb-4"}/>
                        <div className={"px-4"}>
                            Priaten joho!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"06.04.2019"} position={"right"}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2019-ball.jpg"
                               className={"w-full aspect-square object-cover object-center mb-4"}/>
                        <div className={"px-4"}>
                            Stephans erster Tanzball!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"August 2019"}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2019-tuerkei.jpg"
                               className={"w-full aspect-square object-cover object-center mb-4"}/>
                        <div className={"px-4"}>
                            Unser erster gemeinsamer Urlaub. In Dalyan!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"Oktober 2019"} position={"right"}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2019-paris.jpg"
                               className={"w-full aspect-square object-cover object-bottom mb-4"}/>
                        <div className={"px-4"}>
                            Urlaub in Paris!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"Silvester 2019"}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2019-silvester.jpg"
                               className={"w-full aspect-square object-cover object-center mb-4"}/>
                        <div className={"px-4"}>
                            Erster Pärchenurlaub!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"März 2020"} position={"right"}>
                        <div className={"px-4 pt-4"}>
                            Berlin! Berlin! Wir waren in Berlin!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"März 2021"}>
                        <div className={"px-4 pt-4"}>
                            Berlin! Berlin! Wir waren in Berlin!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"Juli 2021"} position={"right"}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2021-sueddeutschland.jpg"
                               className={"w-full aspect-square object-cover object-center mb-4"}/>
                        <div className={"px-4"}>
                            Roadtrip: Deutschlands Süden.
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"30.09.2021"}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2021-goettingen.jpg"
                               className={"w-full aspect-square object-cover object-bottom mb-4"}/>
                        <div className={"px-4"}>
                            Göttingen. Eine Ära zu Ende.
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"21.10.2021"}
                                   position={"right"}
                                   icon={<FontAwesomeIcon icon={faBabyCarriage}
                                                          className="text-white p-1.5"/>}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2021-katze-oktober.jpg"
                               className={"w-full aspect-square object-cover object-top mb-4"}/>
                        <div className={"px-4"}>
                            Hurra! Es ist eine Katze!
                        </div>
                    </TimelineEntry>


                    <TimelineEntry datum={"26.05.2022"}
                                   icon={<FontAwesomeIcon icon={faBabyCarriage} className="text-white p-1.5"/>}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2022-katze-oxford.jpg"
                               className={"w-full aspect-square object-cover object-top mb-4"}/>
                        <div className={"px-4"}>
                            Hurra! Es ist ein Kater!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry datum={"August 2022"} position={"right"}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2022-frankreich.jpg"
                               className={"w-full aspect-square object-cover object-top mb-4"}/>
                        <div className={"px-4"}>
                            Fronkreisch! Normandie! Ola-la!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry
                        datum={"01.06.2023"}
                        icon={(
                            <FontAwesomeIcon icon={faHeart} className="text-white p-1.5"/>
                        )}>
                        <Image alt={""} width={350} height={350} src="/img/timeline/2023-verlobung.jpg"
                               className={"w-full aspect-square object-cover object-center mb-4"}/>
                        <div className={"px-4"}>
                            Verlobung
                        </div>
                    </TimelineEntry>

                    <TimelineEntry
                        position={"right"}
                        datum={"31.05.2025"}
                        icon={(
                            <Image alt={""} width={64} height={64} src={"/img/ring.png"} className="text-white p-1"/>
                        )}>
                        <div className={"px-4 pt-4"}>
                            Well... :)
                        </div>
                    </TimelineEntry>
                </div>
            </div>
        </div>
    )
}