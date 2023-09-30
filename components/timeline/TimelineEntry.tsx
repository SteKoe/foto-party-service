import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapPin} from "@fortawesome/free-solid-svg-icons";
import styles from "./TimelineEntry.module.scss"
import classNames from "classnames";
import {TimelineEvent, TimelineEventPosition} from "@/app/(ContainerLayout)/story/TimelineEvent";
import Image from "next/image";

type TimelineEntryProps = TimelineEvent

const positions: TimelineEventPosition[] = ['left', 'center', 'right']

export function TimelineEntry({
                                  position = positions[Math.floor(Math.random() * positions.length)],
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
                        <div className="overflow-hidden bg-white/80 backdrop-blur rounded shadow relative">
                            {bild ? (<Image alt={""} width={1000} height={1000} src={bild}
                                            className={"w-full min-w-full object-cover object-top"}/>) : ''}
                            {movie ? (<video width={1000} height={1000} src={movie} autoPlay muted loop
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