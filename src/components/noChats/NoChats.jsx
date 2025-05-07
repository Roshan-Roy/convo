import styles from "./nochats.module.css"

const NoChats = ({ text, icon: Icon }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Icon className={styles.icon} />
                <p>{text}</p>
            </div>
        </div>
    )
}

export default NoChats