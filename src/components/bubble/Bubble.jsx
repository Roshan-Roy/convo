import { useAuth } from "../../providers/AuthProvider"
import styles from "./bubble.module.css"

const Bubble = ({
    message,
    senderId
}) => {
    const { user: { id } } = useAuth()
    return <div className={id === senderId ? `${styles.container} ${styles.mine}` : styles.container}>{message}</div>
}

export default Bubble