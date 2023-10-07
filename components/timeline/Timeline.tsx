'use client';

import React, {useEffect} from "react";
import timelineEntryStyles from "./TimelineEntry.module.scss";
import styles from "./Timeline.module.css";
import {TimelineEvent, TimelineEventPosition} from "@/app/(ContainerLayout)/story/TimelineEvent";
import {TimelineEntry} from "@/components/timeline/TimelineEntry";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import lgVideo from "lightgallery/plugins/video";
import LightGallery from "lightgallery/react";

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-video.css';
import 'lightgallery/css/lg-thumbnail.css';

type TimelineProps = {
    timelineIcon: IconDefinition,
    timelineEntries: TimelineEvent[]
}

const positions: TimelineEventPosition[] = ['left', 'center', 'right']

export default function Timeline({timelineEntries, timelineIcon}: TimelineProps) {
    useEffect(() => {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(timelineEntryStyles['is-visible'])
                }
            });
        });

        document.querySelectorAll('.timeline-entry').forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col h-full timeline">
            <div className="h-full relative text-gray-700 antialiased text-sm font-semibold">
                <div
                    className={styles['timeline-bar']}>
                    <FontAwesomeIcon icon={timelineIcon} className={styles['timeline-bar__icon']}/>
                </div>

                <div className="m-2 md:m-8">
                    <LightGallery
                        licenseKey="non-commercial"
                        selector=".gallery-item"
                        download={false}
                        fullScreen={true}
                        videojs={true}
                        videojsOptions={{muted: true}}
                        plugins={[lgVideo]}
                    >
                        {timelineEntries.map((te, idx) => (
                            <TimelineEntry key={`timeline-entry-${idx}`}
                                           {...te}
                                           position={te.position ?? positions[idx % positions.length]}/>
                        ))}
                    </LightGallery>
                </div>

            </div>
        </div>
    )
}