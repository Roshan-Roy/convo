import styles from "./chatcard.module.css"
import { useNavigate } from "react-router-dom"

const ChatCard = ({ name, photoURL, lastMessage, roomId, notification }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(roomId)} className={styles.container}>
            <img src={photoURL} alt={name} referrerPolicy="no-referrer" />
            <div className={styles.details}>
                <div>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.last_message}>
                        {lastMessage ? lastMessage : "No messages yet"}
                    </p>
                </div>
                {<div className={notification ? `${styles.notification} ${styles.on}` : styles.notification}></div>}
            </div>
        </div>
    );
};

export default ChatCard;
