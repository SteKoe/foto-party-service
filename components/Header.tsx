import Image from "next/image";
import styles from "./Header.module.css"


export default function Header() {
    const targetDate = new Date("2024-08-31")
    const now = new Date();
    const secondsDiff = targetDate.getTime() - now.getTime();
    const daysLeft = Math.floor(secondsDiff / (1000 * 3600 * 24));

    let title = <>Kim & Stephan</>;
    let subtitle = (
        <>
            31. August 2024 &middot; Bochum<br/>
            Noch {daysLeft} Tage!
        </>
    );

    return (
        <header className={styles.floralHeader}>
            <Image src="/img/bg-top.png" className={styles.image} width={1250} height={356} alt=""/>
            <div>
                <h1>
                    {title}
                    <small>{subtitle}</small>
                </h1>
            </div>
        </header>
    )
}