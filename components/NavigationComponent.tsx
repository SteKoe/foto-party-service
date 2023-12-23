'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import styles from '@/components/Navigation.module.css';
import Link from 'next/link';
import classNames from 'classnames';

type NavigationComponentProps = {
    links: any[];
};

export function NavigationComponent({ links }: NavigationComponentProps) {
    const currentPathname = usePathname();

    useEffect(() => {
        const listener = () => {
            const classList = document.querySelector('ul[role=navigation]')
                ?.classList;

            if (classList) {
                if (Math.floor(window.scrollY) > 10) {
                    classList.add(styles['scrolled']);
                } else {
                    classList.remove(styles['scrolled']);
                }
            }
        };
        document.addEventListener('scroll', listener);

        return () => document.removeEventListener('scroll', listener);
    }, []);

    return (
        <>
            {links.length <= 1 ? (
                ''
            ) : (
                <ul role="navigation" className={styles.navigation}>
                    {links.map((link) => {
                        const isActive = link.href === currentPathname;

                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={classNames(
                                        styles.navigationItem,
                                        { [styles.isActive]: isActive },
                                    )}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
