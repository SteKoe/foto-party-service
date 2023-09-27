'use client';

import Image from "next/image";
import React, {useEffect} from "react";
import styles from "./TimelinePageContent.module.css"
import classNames from "classnames";
import {events_kim} from "@/app/(ContainerLayout)/story/events_kim";
import {events_stephan} from "@/app/(ContainerLayout)/story/events_stephan";
import Timeline from "@/components/timeline/Timeline";
import {events_coupled} from "@/app/(ContainerLayout)/story/events_coupled";

export function TimelinePageContent() {
    useEffect(() => {
        const observer = new IntersectionObserver((event) => {
            event.forEach(e => {
                const stephan = document.querySelector(`.${styles['stephan']}`);
                const kim = document.querySelector(`.${styles['kim']}`);

                if (e.isIntersecting) {
                    stephan?.classList.add(styles['__coupled'])
                    kim?.classList.add(styles['__coupled'])
                } else {
                    stephan?.classList.remove(styles['__coupled'])
                    kim?.classList.remove(styles['__coupled'])
                }
            })
        }, {
            threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        });

        observer.observe(document.querySelector(`.${styles["main-timeline"]}`)!);
        
        return () => observer.disconnect()
    }, []);

    return (
        <>
            <div className={"sticky top-24 z-20 h-36"}>
                <Image width={96} height={96} src={"/img/timeline/der-stephan.jpg"} alt={""}
                       className={classNames(styles['avatar'], styles['stephan'])}/>
                <Image width={96} height={96} src={"/img/timeline/die-kim.jpg"} alt={""}
                       className={classNames(styles['avatar'], styles['kim'])}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2 md:gap-12 md:mx-12">
                <div className="flex-1">
                    <Timeline timelineEntries={events_kim}/>
                </div>
                <div className="flex-1">
                    <Timeline timelineEntries={events_stephan}/>
                </div>
            </div>
            <div className={classNames(styles["main-timeline"])}>
                <Timeline timelineEntries={events_coupled}/>
            </div>
        </>
    )
}