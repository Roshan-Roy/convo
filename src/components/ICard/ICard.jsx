import styles from "./icard.module.css"

const ICard = ({
    main,
    sub = "",
    icon: Icon,
    height = 0
}) => {
    return (
        <div className={styles.wrapper} style={{ height: `calc(100dvh - ${height}px)` }}>
            <div className={styles.container} style={{ gap: sub ? "12px" : "18px" }}>
                <Icon className={styles.icon} />
                <p className={styles.main}>{main}</p>
                {sub && <p className={styles.sub}>{sub}</p>}
            </div>
        </div>
    )
}

export default ICard