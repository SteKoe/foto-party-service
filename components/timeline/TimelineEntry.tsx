'use client';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapPin} from "@fortawesome/free-solid-svg-icons";
import styles from "./TimelineEntry.module.scss"
import classNames from "classnames";
import {TimelineEvent} from "@/app/(ContainerLayout)/story/TimelineEvent";

import Image from "next/image";


type TimelineEntryProps = TimelineEvent

const dataVideo = (movie: string | undefined) => {
    if (!movie) {
        return undefined;
    }

    return JSON.stringify({
        source: [
            {
                src: movie,
                type: 'video/mp4',
            },
        ],
        attributes: {preload: false, controls: false, playsinline: true, muted: true},
    });
}

export function TimelineEntry({
                                  position,
                                  icon,
                                  datum,
                                  bild,
                                  movie,
                                  beschreibung
                              }: TimelineEntryProps) {
    return (
        <section className={classNames(
            "timeline-entry",
            styles['timeline-entry'],
            {
                [styles['timeline-entry--left']]: position === 'left',
                [styles['timeline-entry--center']]: position === 'center',
                [styles['timeline-entry--right']]: position === 'right',
            }
        )}>
            <div className={styles['timeline-entry__wrapper']}>
                <div
                    className={styles['timeline-entry__body']}
                >
                    <div>
                        <div data-src={bild}
                             data-video={dataVideo(movie)}
                             data-sub-html={beschreibung}
                             className={classNames('overflow-hidden bg-white/80 backdrop-blur rounded shadow relative', {'gallery-item': bild || movie})}>
                            {bild ? (<Image alt={""} width={640} height={640} src={bild}
                                            className={"w-full min-w-full object-cover object-top"}/>) : ''}
                            {movie ? (<video width={640}
                                             height={640}
                                             src={movie}
                                             autoPlay={true}
                                             muted={true}
                                             loop={true}
                                             playsInline={true}
                                             className={"w-full min-w-full object-cover object-top"}/>) : ''}

                            {beschreibung ? (
                                <section className={"px-4 pt-4"}>
                                    {beschreibung}
                                </section>
                            ) : ''}
                            {datum ? (<div className="px-4 pb-4"><strong><em>{datum}</em></strong></div>) : ''}
                        </div>
                    </div>
                </div>
                <div
                    className={styles['timeline-entry__icon']}>
                    {icon ? icon : <FontAwesomeIcon icon={faMapPin} className="text-white p-2.5"/>}
                </div>
            </div>
        </section>
    );
}