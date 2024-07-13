import styles from "./AnimatedStarfield.module.scss";
import classNames from "classnames";

export default function AnimatedStarfield() {
  return (
    <>
      <div
        className={classNames(styles["root"], "starfield-root flex flex-col")}
      >
        <div className={styles["starContainer"]}>
          <div className={classNames(styles["stars1"], "stars1")}>
            <div
              className={classNames(styles["stars"], styles["smallStars"])}
            />
          </div>
          <div className={classNames(styles["stars2"], "stars2")}>
            <div
              className={classNames(styles["stars"], styles["smallStars"])}
            />
          </div>
          <div className={classNames(styles["stars3"], "stars3")}>
            <div className={classNames(styles["stars"])} />
          </div>
          <div className={classNames(styles["stars4"], "stars4")}>
            <div className={classNames(styles["stars"])} />
          </div>
        </div>
      </div>
    </>
  );
}
