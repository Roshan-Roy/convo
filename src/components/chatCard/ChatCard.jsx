import styles from "./chatcard.module.css"
import { useNavigate } from "react-router-dom";

const ChatCard = ({ name, photoURL, lastMessage, roomId }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.chatCard} onClick={() => navigate(roomId)}>
            <img src={photoURL} alt={name} className={styles.chatAvatar} referrerPolicy="no-referrer" />
            <div className={styles.chatInfo}>
                <h2 className={styles.chatName}>{name}</h2>
                <p className={styles.chatMessage}>
                    {lastMessage ? lastMessage : "No messages yet"}
                </p>
                <p className={styles.chatRoomId}>Room ID: {roomId}</p>
            </div>
        </div>
    );
};

export default ChatCard;
