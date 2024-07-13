import Image from "next/image";
import styles from "./FloralHeader.module.css";

export default function FloralHeader() {
  return (
    <header className={styles.floralHeader}>
      <Image
        src="/img/bg-top.png"
        className={styles.image}
        width={1250}
        height={356}
        alt=""
      />
    </header>
  );
}
