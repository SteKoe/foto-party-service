'use client'

import styles from "./Navigation.module.css"
import Link from "next/link";
import {usePathname} from "next/navigation";
import classNames from "classnames";

const links = [
    {name: "Start", href: "/"},
    {name: "Wann & Wo", href: "/location"},
    {name: "Story", href: "/story"},
]

export default function Navigation() {
    const currentPathname = usePathname();

    return (
        <ul role="navigation" className={styles.navigation}>
            {links.map(link => {
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