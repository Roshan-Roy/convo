import styles from "./errorcard.module.css"
import { MdErrorOutline } from "react-icons/md";

const ErrorCard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <MdErrorOutline className={styles.icon} />
                <p className={styles.main}>An error occurred</p>
                <p className={styles.sub}>Try refreshing to continue</p>
            </div>
        </div>
    )
}

export default ErrorCard