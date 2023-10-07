'use client';

import Image from "next/image";
import React, {useEffect} from "react";
import styles from "./TimelinePageContent.module.css"
import classNames from "classnames";
import {events_kim} from "@/app/(ContainerLayout)/story/events_kim";
import {events_stephan} from "@/app/(ContainerLayout)/story/events_stephan";
import Timeline from "@/components/timeline/Timeline";
import {events_coupled} from "@/app/(ContainerLayout)/story/events_coupled";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import abc from "./abc.svg";

export function TimelinePageContent() {
    useEffect(() => {
        const listener = () => {
            const stephan = document.querySelector(`.${styles['stephan']}`);
            const kim = document.querySelector(`.${styles['kim']}`);
            const timeline = document.querySelector(`.${styles["main-timeline"]}`)!;
            const top = timeline.getBoundingClientRect().top;

            if (top <= 400) {
                stephan?.classList.add(styles['__coupled'])
                kim?.classList.add(styles['__coupled'])
            } else {
                stephan?.classList.remove(styles['__coupled'])
                kim?.classList.remove(styles['__coupled'])
            }
        };

        window.addEventListener('scroll', listener);

        return () => window.removeEventListener("scroll", listener);
    }, []);

    return (
        <>
            <div className={"sticky top-24 z-20 h-36 pointer-events-none"}>
                <Image width={96} height={96} src={"/img/timeline/der-stephan.jpg"} alt={""}
                       className={classNames(styles['avatar'], styles['stephan'])}/>
                <Image width={96} height={96} src={"/img/timeline/die-kim.jpg"} alt={""}
                       className={classNames(styles['avatar'], styles['kim'])}/>
            </div>

            <div className="grid grid-cols-2 gap-2 mx-2 md:gap-12 md:mx-12">
                <div className="flex-1">
                    <Timeline timelineEntries={events_kim} timelineIcon={faHeart}/>
                </div>
                <div className="flex-1">
                    <Timeline timelineEntries={events_stephan} timelineIcon={faHeart}/>
                </div>
            </div>
            
            <div className={classNames(styles["main-timeline"])}>
                <Timeline timelineEntries={events_coupled} timelineIcon={faHeart}/>
            </div>
        </>
    )
}