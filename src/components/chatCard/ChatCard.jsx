import styles from "./chatcard.module.css"
import { useNavigate } from "react-router-dom"

const ChatCard = ({ name, photoURL, lastMessage, roomId, notification }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.chatCard} onClick={() => navigate(roomId)}>
            <img src={photoURL} alt={name} className={styles.chatAvatar} referrerPolicy="no-referrer" />
            <div className={styles.chatInfo}>
                <h2 className={styles.chatName}>{name}</h2>
                <p className={styles.chatMessage}>
                    {lastMessage ? lastMessage : "No messages yet"}
                </p>
                {notification && <span>New message</span>}
            </div>
        </div>
    );
};

export default ChatCard;
