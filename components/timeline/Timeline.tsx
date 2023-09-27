'use client';

import React, {useEffect} from "react";
import timelineEntryStyles from "./TimelineEntry.module.scss";
import styles from "./Timeline.module.css";
import {TimelineEvent} from "@/app/(ContainerLayout)/story/TimelineEvent";
import {TimelineEntry} from "@/components/timeline/TimelineEntry";
import {faHeart, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type TimelineProps = {
    timelineIcon: IconDefinition,
    timelineEntries: TimelineEvent[]
}

export default function Timeline({timelineEntries, timelineIcon}: TimelineProps) {
    useEffect(() => {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(timelineEntryStyles['is-visible'])
                }
            });
        });

        document.querySelectorAll('.timeline-entry').forEach((section) => {
            observer.observe(section);
        });
    }, []);

    return (
        <div className="flex flex-col h-full timeline">
            <div className="h-full relative text-gray-700 antialiased text-sm font-semibold">
                <div
                    className={styles['timeline-bar']}>
                    <FontAwesomeIcon icon={timelineIcon} className={styles['timeline-bar__icon']}/>
                </div>

                <div className="m-8">
                    {timelineEntries.map((te, idx) => (
                        <TimelineEntry key={`timeline-entry-${idx}`}
                                       datum={te.datum}
                                       position={te.position}
                                       icon={te.icon}
                                       beschreibung={te.beschreibung}
                                       bild={te.bild}/>
                    ))}
                </div>

            </div>
        </div>
    )
}