import {NavigationComponent} from "@/components/NavigationComponent";
import {cookies} from "next/headers";
import {checkIsAuthorized, TOKEN_PARAM_NAME} from "@/middleware";
import {DateTime} from "luxon";

type Links = {
    name: string;
    href: string;
    filterFn?: (params: any) => boolean
}

const links: Links[] = [
    {name: "Start", href: "/"},
    {name: "Wann & Wo", href: "/location", filterFn: ({isAuthorized}) => isAuthorized === true},
    {name: "Story", href: "/story", filterFn: ({isAuthorized}) => isAuthorized === true},
    {
        name: "Galerie", href: "/pictures", filterFn: ({isAuthorized}) => {
            return isAuthorized === true && DateTime.now() >= DateTime.fromISO(process.env.MARRIAGE_DATE!);
        }
    },
]

export default function Navigation() {
    const isAuthorized = checkIsAuthorized(cookies().get(TOKEN_PARAM_NAME)?.value);
    const filteredLinks = links
        .filter(l => l.filterFn?.({isAuthorized}) ?? true)
        .map(l => ({...l, filterFn: undefined}));

    return <NavigationComponent links={filteredLinks}/>
}