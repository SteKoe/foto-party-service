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
    {name: "Start", href: "/" },
    {name: "Wann & Wo", href: "/location"},
    {name: "Story", href: "/story"},
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

    return (
        <ul role="navigation" className={styles.navigation}>
            {links.filter(link => link.filterFn?.call(link, {isAuthorized}) ?? true).map(link => {
                const isActive = link.href === currentPathname;

                return (
                    <li key={link.name}>
                        <Link href={link.href} className={classNames(styles.navigationItem, {[styles.isActive]: isActive})}>
                            {link.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    )
}