import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapPin} from "@fortawesome/free-solid-svg-icons";
import styles from "./TimelineEntry.module.scss"
import classNames from "classnames";
import {TimelineEvent} from "@/app/(ContainerLayout)/story/TimelineEvent";
import Image from "next/image";

type TimelineEntryProps = TimelineEvent

export function TimelineEntry({position = 'left', icon, datum, bild, beschreibung}: TimelineEntryProps) {
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
                            {bild ? (<Image alt={""} width={350} height={350} src={bild}
                                            className={"w-full aspect-square object-cover object-top"}/>) : ''}
                            <section className={"px-4 pt-4"}>
                                {beschreibung}
                                {position}
                            </section>
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