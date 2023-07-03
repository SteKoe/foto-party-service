import {TimelineEntry} from "@/components/TimelineEntry";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faRing} from '@fortawesome/free-solid-svg-icons'

export default function Timeline() {
    return (
        <div className=" flex flex-col justify-center ">
            <div className="py-3 sm:max-w-xl sm:mx-auto w-full px-2 sm:px-0">

                <div className="relative text-gray-700 antialiased text-sm font-semibold">

                    <div
                        className="hidden sm:block w-0.5 bg-white absolute h-full left-1/2 transform -translate-x-1/2"></div>

                    <TimelineEntry
                        datum={"01.02.2019"}
                        icon={(
                            <FontAwesomeIcon icon={faHeart} className="text-white p-1.5"/>
                        )}>
                        <div className={"px-4 pt-4"}>
                            Now this is a story all about how.
                        </div>
                    </TimelineEntry>

                    <TimelineEntry
                        position={"right"}
                        datum={"Oktober 2019"}>
                        <img src="/img/2019-paris.jpg" className={"aspect-square object-cover object-bottom mb-4"} />
                        <div className={"px-4"}>
                            Urlaub in Paris!
                        </div>
                    </TimelineEntry>

                    <TimelineEntry
                        datum={"01.06.2023"}
                        icon={(
                            <FontAwesomeIcon icon={faHeart} className="text-white p-1.5"/>
                        )}>
                        <img src="/img/2023-verlobung.jpg" className={"aspect-square object-cover object-center mb-4"} />
                        <div className={"px-4"}>
                            Verlobung
                        </div>
                    </TimelineEntry>

                    <TimelineEntry
                        datum={"31.05.2025"}
                        position={"right"}
                        icon={(
                            <img src={"/img/ring.png"} className="text-white p-1" />
                        )}>
                        <div className={"px-4 pt-4"}>
                            Well... 
                        </div>
                    </TimelineEntry>


                </div>
            </div>
        </div>
    )
}