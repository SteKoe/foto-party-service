'use client'

import styles from "./Navigation.module.css"
import Link from "next/link";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {useEffect, useState} from "react";

type Links = {
    name: string;
    href: string;
    filterFn?: (params: any) => boolean
}

const links: Links[] = [
    {name: "Start", href: "/"},
    {name: "Wann & Wo", href: "/location", filterFn: ({isAuthorized}) => isAuthorized === true},
    {name: "Story", href: "/story", filterFn: ({isAuthorized}) => isAuthorized === true},
    {name: "Galerie", href: "/pictures", filterFn: ({isAuthorized}) => isAuthorized === true},
]

export default function Navigation() {
    const currentPathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const auth = async () => {
            try {
                const response = await fetch("/api/auth");
                let data = await response.json();
                setIsAuthorized(data.authorized)
            } catch (e) {
                console.error(e);
                setIsAuthorized(false)
            }
        }

        auth();
    }, []);

    useEffect(() => {
        const listener = (e: Event) => {
            const classList = document.querySelector("ul[role=navigation]")?.classList;
            
            if(classList) {
                if (Math.floor(window.scrollY) > 10) {
                    classList.add(styles['scrolled']);
                } else {
                    classList.remove(styles['scrolled']);
                }
            }
        };
        document.addEventListener("scroll", listener)

        return () => document.removeEventListener("scroll", listener);
    }, []);

    const filteredLinks = links.filter(link => link.filterFn?.call(link, {isAuthorized}) ?? true);

    return (
        <>
            {
                filteredLinks.length <= 1 ? '' : (<ul role="navigation" className={styles.navigation}>
                    {filteredLinks.map(link => {
                        const isActive = link.href === currentPathname;
    
                        return (
                            <li key={link.name}>
                                <Link href={link.href}
                                      className={classNames(styles.navigationItem, {[styles.isActive]: isActive})}>
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>)
            }
        </>
    )
}